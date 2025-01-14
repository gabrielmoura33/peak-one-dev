import { CheckoutPageType } from "@/interfaces/checkoutPage";
import React from "react";

type Props = {
  info: CheckoutPageType;
};

const SecondTemplatePage = ({ info }: Props) => {
  return (
    <div className="flex flex-col items-center relative">
      <h1>Hello World</h1>
    </div>
  );
};

export default SecondTemplatePage;
