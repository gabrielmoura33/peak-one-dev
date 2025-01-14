"use client";
import React, { useEffect, useState } from "react";
import { CheckoutPageType } from "@/interfaces/checkoutPage";
import { useTracking } from "@/context/TrackingContext";
import HandleSessionStart from "@/components/atoms/checkout-handle-session-start";
import { ProductInfoType } from "@/interfaces/productInfo";
import { createJimmyKey } from "@/utils/jimmyKeyUtils";
import { CustomerInfoType } from "@/interfaces/customerInfo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSession } from "@/context/SessionContext";
import { emergencyStartSession } from "@/utils/emergencySessionStart";
import { encryptCreditCard } from "@/utils/encryptUtils";
import { sendGAEvent } from "@next/third-parties/google";
import { useRouter } from "next/navigation";
import { delay } from "@/utils/delay";
import PromotionTimer from "../PromotionTimer";
import SectionTitle, { IconType } from "../SectionTitle";
import QuantityInfo from "./QuantityInfo";
import CustomerInfo from "./CustomerInfo";
import ShippingInfo from "./ShippingInfo";
import PaymentInfo from "./PaymentInfo";

type Props = {
  info: CheckoutPageType;
};

// Due to technical test time constraints, only implementing the layout structure and form validations 
const CheckoutForm = ({ info }: Props) => {
  const { ffVid, hitId } = useTracking();
  const { sessionId, setSessionId, confirmOrder } = useSession();
  const [queryString, setQueryString] = useState<string>("");
  const router = useRouter();

  const [loading, setLoading] = useState("");
  const [showPop, setShowPop] = useState(false);
  const [showPaypalPop, setShowPaypalPop] = useState(false);
  const [country, setCountry] = useState("US");
  const [product, setProduct] = useState<ProductInfoType>({
    product: 1,
    productName: `2x ${info.product.name}`,
    productPrice: `${info.product.price2}`,
    productShipping: `${info.product.ship2}`,
    productShippingId: `${info.product.shippingId2}`,
    productOfferId: `${info.product.offerId2}`,
    productStickyId: `${info.product.stickyId2}`,
  });


  const initialCustomerInfo: CustomerInfoType = {
    sessionId: sessionId || "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "US",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    card: "",
    month: "",
    year: "",
    cvv: "",
    couponActive: false,
    couponValue: info.product.couponValue,
  };

  const [customerInfo, setCustomerInfo] =
    useState<CustomerInfoType>(initialCustomerInfo);

  const zipRegexes: { [key: string]: RegExp } = {
    US: /^\d{5}(-\d{4})?$/, // United States: 12345 or 12345-6789
    AU: /^\d{4}$/, // Australia: 1234
    CA: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i, // Canada: A1A 1A1
    FI: /^\d{5}$/, // Finland: 12345
    FR: /^\d{5}$/, // France: 12345
    DE: /^\d{5}$/, // Germany: 12345
    IS: /^\d{3}$/, // Iceland: 123
    IE: /^[A-Z]\d{2}[A-Z\d]?[A-Z]?( \d{4})?$/i, // Ireland: A12 B3CD or A12 1234
    IL: /^\d{5}(\d{2})?$/, // Israel: 1234567 or 12345
    NZ: /^\d{4}$/, // New Zealand: 1234
    NO: /^\d{4}$/, // Norway: 1234
    SE: /^\d{3}[ ]?\d{2}$/, // Sweden: 123 45 or 12345
    GB: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i, // United Kingdom: AB1 2CD or AB12 3CD
  };

  const formik = useFormik({
    initialValues: customerInfo,
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      address: Yup.string().required("Address is required"),
      address2: Yup.string(),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zip: Yup.string()
        .test(
          "zip",
          "Invalid Postal/ZIP code",
          function (value: string | undefined) {
            if (!value) return false; // Handle undefined case
            const country = this.parent.country as string; // Type assertion
            const regex = zipRegexes[country] || /.+/; // Default to any non-empty string
            return regex.test(value);
          }
        )
        .required("Postal/ZIP code is required"),
      card: Yup.string()
        .matches(/^[0-9]{13,19}$/, "Card number must be 13-19 digits")
        .required("Card Number is required"),
      cvv: Yup.string()
        .matches(/^[0-9]{3,4}$/, "CVV must be 3-4 digits")
        .required("CVV is required"),
      month: Yup.string().required("Expiry Month is required"),
      year: Yup.string().required("Expiry Year is required"),
    }),
    onSubmit: async (values) => {
      setCustomerInfo({
        ...customerInfo,
        ...values,
        couponActive: customerInfo.couponActive,
      });
      setLoading("Processing Payment");

      // If there is no session ID, start a new session
      let mysessionId = sessionId;
      if (!sessionId) {
        const newSessionId = await emergencyStartSession(
          info,
          product,
          setSessionId,
          ffVid || "",
          hitId || ""
        );
        if (newSessionId) {
          mysessionId = newSessionId;
        } else {
          // Emergency session start
          setLoading("Error - Please Try Refreshing the Page");

          setTimeout(() => {
            setLoading("");
            window.location.reload();
          }, 2000);
          console.error("No session ID found");
          return;
        }
      }
      if (!mysessionId) return;

      const encryptedCard = encryptCreditCard(values.card);
      const encryptedCVV = encryptCreditCard(values.cvv);

      const seshData = await confirmPurchase(mysessionId, {
        customerInfo: {
          ...values,
          card: encryptedCard.encryptedData,
          cvv: encryptedCVV.encryptedData,
          notes: window.location.href + " | " + navigator.userAgent,
          couponActive: customerInfo.couponActive,
        },
        product: product.product,
        productId: product.productStickyId,
        productName: product.productName,
        productPrice: product.productPrice,
        productShipping: product.productShipping,
        productShippingId: product.productShippingId,
        productOfferId: product.productOfferId,
        promoCode: customerInfo.couponActive ? "5OFFPOP" : "",
        orderConfirmed: new Date().toISOString(),
      });
      let value =
        parseFloat(product.productPrice) +
        parseFloat(product.productShipping) +
        0;
      if (seshData && seshData.message === "Pre-Auth Success") {
        confirmOrder();
        sendGAEvent("event", "start_credit_card_order", {
          sessionId: mysessionId,
        });
        // sendGAEvent("event", "purchase", {
        //   transaction_id: mysessionId,
        //   value: value,
        //   tax: 0,
        //   shipping: parseFloat(product.productShipping),
        //   currency: "USD",
        //   items: [
        //     {
        //       item_id: product.productStickyId,
        //       item_name: product.productName,
        //       currency: "USD",
        //       price: parseFloat(product.productPrice),
        //       quantity: 1,
        //     },
        //   ],
        // });
        setLoading("Order Confirmed");
        setTimeout(() => {
          setLoading("One More Thing...");
          setTimeout(() => {
            router.push(`/checkout/upsell1?${queryString}`);
          }, 1000);
        }, 1000);
      } else {
        setLoading("Error Processing Payment");
        setTimeout(() => {
          setLoading("Please Try Another Payment Method");
          setTimeout(() => {
            setLoading("");
          }, 2000);
        }, 2000);
        const reportError = await fetch("/api/utility/send-slack-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-jimmy-key": createJimmyKey().encryptedData,
          },
          body: JSON.stringify({
            message: "Error - Pre-Auth Failed - Checkout Page",
            errorDetails: "Pre Auth Declined or Failed - Checkout Page",
            userInfo: { mysessionId },
          }),
        });
      }
    },
  });

  const confirmPurchase = async (
    sessionId: string,
    updates: Record<string, any>
  ) => {
    try {
      const response = await fetch("/api/session/confirm-purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-jimmy-key": createJimmyKey().encryptedData,
        },
        body: JSON.stringify({
          sessionId,
          updates,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating session:", error);
      return null;
    }
  };

  const activateCoupon = async () => {
    if (customerInfo.couponActive) return;
    setShowPop(false);
    await delay(200);
    setCustomerInfo({ ...customerInfo, couponActive: true });
    // console.log("Coupon activated");
    // const newPrice = Number(product.productPrice) - 5;
    // setProduct({
    //   ...product,
    //   productPrice: newPrice.toFixed(2),
    // });
  };

  const firePaypal = async () => {
    confirmOrder();
    // If there is no session ID, start a new session
    let mysessionId = sessionId;
    if (!sessionId) {
      // console.log("No session ID found. Starting emergency session...");
      const newSessionId = await emergencyStartSession(
        info,
        product,
        setSessionId,
        ffVid || "",
        hitId || ""
      );
      // console.log("Emergency session ID:", newSessionId);
      if (newSessionId) {
        mysessionId = newSessionId;
      } else {
        // Emergency session start
        setLoading("Error - Please Try Refreshing the Page");

        setTimeout(() => {
          setLoading("");
          window.location.reload();
        }, 2000);
        console.error("No session ID found");
        return;
      }
    }
    if (!mysessionId) {
      console.error("No session ID found");
      setLoading("");
      return;
    }
    sendGAEvent("event", "start_paypal_order", { sessionId: mysessionId });
    setShowPaypalPop(false);
    setLoading("Connecting to PayPal");
    try {
      const response = await fetch("/api/session/start-paypal-purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-jimmy-key": createJimmyKey().encryptedData,
        },
        body: JSON.stringify({
          sessionId: mysessionId,
          product: product.product,
          productId: product.productStickyId,
          productName: product.productName,
          productPrice: product.productPrice,
          productShipping: product.productShipping,
          shippingId: product.productShippingId,
          campaignId: info.stickyCampaign,
          promoCode: customerInfo.couponActive ? "5OFFPOP" : "",
          alt_pay_return_url: `${process.env.NEXT_PUBLIC_API_URL}/checkout/upsell1?${queryString}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.redirectUrl) {
        setLoading("Redirecting to PayPal");
        await delay(500);
        // Redirect to the URL provided in the response
        window.location.href = data.redirectUrl;
      } else if (data && data.htmlContent) {
        // Render the HTML content in a specified container
        document.getElementById("payment-container")!.innerHTML =
          data.htmlContent;
        setLoading(""); // Stop loading as the content is now rendered
      } else {
        // Handle the case where no redirect or HTML content is provided
        setLoading("Error with PayPal. Please try again.");
        setTimeout(() => {
          setLoading("");
        }, 2000);
      }
    } catch (error) {
      setLoading("Error with PayPal. Please try again.");
      setTimeout(() => {
        setLoading("");
      }, 2000);
    }
  };

  //check the users country and set the default country
  useEffect(() => {
    const getCountry = async () => {
      if (typeof window !== "undefined") {
        try {
          const response = await fetch("/api/utility/geo-ip", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-jimmy-key": createJimmyKey().encryptedData,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data.country) {
            setCustomerInfo({
              ...customerInfo,
              country: data.country,
            });
            formik.setFieldValue("country", data.country);
            setCountry(data.country);
          }
        } catch (error) {
          console.error("Error fetching geolocation:", error);
        }
      }
      return null;
    };
    getCountry();
  }, []);

  return (
    <>
    <HandleSessionStart
      info={info}
      setCustomerInfo={() => {}}
      product={product}
    />
    <div className="w-[53%] flex flex-col float-left relative pt-[3.125rem] pr-[3.125rem] pb-[4.375rem] pl-0 bg-white">
      <PromotionTimer />
      <div className="flex flex-col mt-10">
        <QuantityInfo product={product} info={info} setProduct={() => {}} couponActive country="US"/>
        <CustomerInfo formik={formik} country="US" />
        <ShippingInfo formik={formik} />
        <PaymentInfo formik={formik} />

        <button
            className="flex items-center justify-center w-full h-[75px] bg-[#00af3a] text-[1.75rem] text-white border border-[#77d496] rounded-[5px] font-inter font-bold shadow-[1px_1px_#00a04a] mt-5 cursor-pointer outline-none px-6 hover:bg-[#009932] hover:shadow-[2px_2px_#008b2f] transition-all duration-200"
            type="button"
          >
            <span className="mr-4">Complete Checkout</span>
            <img src="/images/btn-arw.png" alt="Arrow Icon" className="w-[24px] h-[24px]" />
          </button>
          
          <div className="mt-10 w-full">
            <img src="/images/guaranty-seal.jpg" alt="" className="w-full h-auto" />
          </div>
      </div>
    </div>
    </>

  );
};

export default CheckoutForm;
