import React from 'react';
import SectionTitle, { IconType } from '../../SectionTitle';

interface QuantityInfoProps {
  product: any;
  info: any;
  setProduct: (product: any) => void;
  couponActive: boolean;
  country: string;
}

const QuantityInfo: React.FC<QuantityInfoProps> = ({
  product,
  info,
  setProduct,
  couponActive,
  country
}) => {
  return (
    <div className="w-full flex flex-col">
      <SectionTitle 
        icon={IconType.QUANTITY}
        title="Select Quantity"
        subtitle="How many hearing aids do you want?"
      />
      
      <div className="flex flex-col mt-6">
        <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
          <div className="flex items-center">
            <input
              type="radio"
              checked={product.quantity === 1}
              onChange={() => setProduct({...product, quantity: 1})}
              className="w-4 h-4"
            />
            <span className="ml-3 text-lg font-medium">1 Unidade</span>
          </div>
          <span className="font-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(product.productPrice)}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg mt-3 cursor-pointer hover:bg-gray-50">
          <div className="flex items-center">
            <input
              type="radio" 
              checked={product.quantity === 2}
              onChange={() => setProduct({...product, quantity: 2})}
              className="w-4 h-4"
            />
            <span className="ml-3 text-lg font-medium">2 Unidades</span>
          </div>
          <span className="font-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(product.productPrice * 2)}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg mt-3 cursor-pointer hover:bg-gray-50">
          <div className="flex items-center">
            <input
              type="radio"
              checked={product.quantity === 3}
              onChange={() => setProduct({...product, quantity: 3})}
              className="w-4 h-4"
            />
            <span className="ml-3 text-lg font-medium">3 Unidades</span>
          </div>
          <span className="font-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(product.productPrice * 3)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuantityInfo;
