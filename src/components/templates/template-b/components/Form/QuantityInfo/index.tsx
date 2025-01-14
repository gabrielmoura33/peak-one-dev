import React from "react";
import SectionTitle, { IconType } from "../../SectionTitle";
import ProductOption from "@/components/organisms/ProductOption";
import { ProductInfoType } from "@/interfaces/productInfo";

interface QuantityInfoProps {
  product: any;
  setProduct: (product: ProductInfoType) => void;
  couponActive: boolean;
  country: string;
  productInfo: any; // Dados do JSON `info.product`
}

const QuantityInfo: React.FC<QuantityInfoProps> = ({
  product,
  setProduct,
  couponActive,
  country,
  productInfo,
}) => {
  // Gerar dinamicamente as opções de produtos
  const productOptions = Object.keys(productInfo)
    .filter((key) => key.startsWith("price")) // Filtrar chaves relacionadas aos preços
    .map((key, index) => {
      const suffix = key.replace("price", ""); // Extrair o sufixo (1, 2, 3, 4)
      return {
        id: suffix,
        name: `${productInfo[`qty${suffix}`]} Unidade(s)`,
        price: parseFloat(productInfo[key]).toFixed(2),
        originalPrice: parseFloat(productInfo[`ogPrice${suffix}`]).toFixed(2),
        save: (
          parseFloat(productInfo[`ogPrice${suffix}`]) -
          parseFloat(productInfo[key])
        ).toFixed(2),
        quantity: parseInt(productInfo[`qty${suffix}`], 10),
        image: productInfo[`image${suffix}`],
      };
    });

  const handleProductSelection = (selectedQuantity: number) => {
    const selectedOption = productOptions.find(
      (option) => option.quantity === selectedQuantity
    );
    if (selectedOption) {
      setProduct({
        product: selectedOption.quantity,
        productName: selectedOption.name,
        productPrice: selectedOption.price,
        productShipping: productInfo[`ship${selectedOption.id}`],
        productShippingId: productInfo[`shippingId${selectedOption.id}`],
        productOfferId: productInfo[`offerId${selectedOption.id}`],
        productStickyId: productInfo[`stickyId${selectedOption.id}`],
        productImage: selectedOption.image,
      });
    }
  };

  return (
    <div className="w-full flex flex-col">
      <SectionTitle
        icon={IconType.QUANTITY}
        title="Select Quantity"
        subtitle="How many units do you want?"
      />

      <div className="flex flex-col mt-6 space-y-3">
        {productOptions.map((option) => (
          <ProductOption
            key={option.id}
            id={option.id}
            name={option.name}
            price={option.price}
            originalPrice={option.originalPrice}
            save={option.save}
            imageSrc={option.image || ""}
            isSelected={product.product === option.quantity}
            onChange={() => handleProductSelection(option.quantity)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuantityInfo;
