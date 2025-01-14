import { CheckoutPageType } from "@/interfaces/checkoutPage";
import React from "react";
import Header from "./components/header";

type Props = {
  info: CheckoutPageType;
};

const SecondTemplatePage = ({ info }: Props) => {
  return (
    <div className="flex flex-col items-center relative ">
      <Header />
    </div>
  );
};

export default SecondTemplatePage;
