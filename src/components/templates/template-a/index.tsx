import React from "react";
import CheckoutHeader from "./components/checkout/checkout-header";
import CheckoutForm from "./components/checkout/checkout-form";
import Footer from "./components/checkout/checkout-footer";
import { CheckoutPageType } from "@/interfaces/checkoutPage";
import FunnelFluxScripts from "@/lib/funnel-flux-scripts";
import CheckoutClickId from "./components/checkout/checkout-click-id";

type Props = {
  info: CheckoutPageType;
};

const FirstTemplatePage = ({ info }: Props) => {
  return (
    <div className="flex flex-col items-center relative">
      <CheckoutHeader info={info} />
      <CheckoutForm info={info} />
      <Footer info={info} />
      <FunnelFluxScripts funnelFlux={info.funnelFlux} />
      <CheckoutClickId />
    </div>
  );
};

export default FirstTemplatePage;
