import { CheckoutPageType } from "@/interfaces/checkoutPage";
import React from "react";
import Header from "./components/Header";
import Form from "./components/Form"
import Summary from "./components/Summary";
type Props = {
  info: CheckoutPageType;
};

const SecondTemplatePage = ({ info }: Props) => {
  return (
    <div className="flex flex-col relative bg-[#FFFFF]">
      <Header />
      <div className="flex w-[85rem] mx-auto p-0 relative mt-10">
        <Form info={info} />
        <Summary />
      </div>
    </div>
  );
};

export default SecondTemplatePage;
