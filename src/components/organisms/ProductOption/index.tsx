import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import DiscountBadge from '@/components/atoms/DiscountBadge';

interface ProductOptionProps {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  save: string;
  imageSrc?: string;
  isSelected: boolean;
  onChange: () => void;
}

const ProductOption: React.FC<ProductOptionProps> = ({
  name,
  price,
  originalPrice,
  save,
  imageSrc,
  isSelected,
  onChange,
}) => {
  const discount = Math.round(
    ((parseFloat(originalPrice) - parseFloat(price)) / parseFloat(originalPrice)) * 100
  );

  return (
    <div
      key={name}
      className="form-check cursor-pointer relative"
      onClick={onChange}
    >
      <DiscountBadge
        discount={discount}
        className="absolute top-[30%] left-[28%] z-[2]"
      />
      <label
        className={`text-base text-black text-center font-normal box-border w-full p-4 rounded-lg cursor-pointer min-h-[100px] relative m-auto mt-8 flex items-center shadow-md ${
          isSelected
            ? 'border-2 border-blue-600 bg-yellow-100'
            : 'border-2 border-gray-300'
        }`}
      >
        <div className="flex flex-col w-full">
          <div className="flex">
            <Checkbox.Root
              checked={isSelected}
              className={`w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center ${
                isSelected ? 'bg-black' : 'bg-white'
              } focus:outline-none focus:ring-2 focus:ring-blue-600 `}
              id={`checkbox-${name}`}
            >
              <Checkbox.Indicator>
                <CheckIcon className="w-6 h-6 text-white" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <strong className="ml-4 text-lg">{name}</strong>
          </div>
          {imageSrc && (
            <img
              src={imageSrc}
              alt={name}
              className="w-[230px] object-contain mt-2"
            />
          )}
        </div>
        <div
          className="flex flex-col text-right text-black text-sm font-normal cursor-pointer box-border w-[70%] relative"
        >
          <p className="text-gray-500 line-through text-lg mt-2">${originalPrice}</p>
          <p className="text-3xl font-bold text-black mt-1">${price}</p>
          <p className="text-green-500 text-2xl font-bold">You Save ${save}</p>
        </div>
      </label>
      
    </div>
  );
};

export default ProductOption;
