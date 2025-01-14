import React from "react";
import { CheckoutPageType } from "@/interfaces/checkoutPage";
import FirstTemplatePage from "../../components/templates/template-a";
import SecondTemplatePage from "../../components/templates/template-b";

type Props = {
  info: CheckoutPageType;
};
enum CheckoutTemplate {
  TEMPLATE_ONE = "1",
  TEMPLATE_TWO = "2",
}

interface TemplateComponents {
  [CheckoutTemplate.TEMPLATE_ONE]: JSX.Element;
  [CheckoutTemplate.TEMPLATE_TWO]: JSX.Element;
}

const CheckoutPage = ({ info }: Props) => {
  if (!info) {
    return (
      <div>
        Error: Unable to load checkout information. Please try again later.
      </div>
    );
  }

  const renderTemplate = (template: string, info: CheckoutPageType): JSX.Element => {
    const templates: TemplateComponents = {
      [CheckoutTemplate.TEMPLATE_ONE]: <FirstTemplatePage info={info} />,
      [CheckoutTemplate.TEMPLATE_TWO]: <SecondTemplatePage info={info} />
    };

    const selectedTemplate = templates[template as CheckoutTemplate];
    
    if (!selectedTemplate) {
      return <div>Template não encontrado. Por favor, selecione um template válido.</div>;
    }

    return selectedTemplate;
  };

  return renderTemplate(info.template, info);
};

export default CheckoutPage;
