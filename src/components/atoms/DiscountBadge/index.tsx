import React from 'react';

interface DiscountBadgeProps {
  discount: number;
  className?: string;
  discountClass?: string;
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ 
  discount, 
  className = '', 
  discountClass = '' 
}) => {
  return (
    <div
      className={`w-[3.9375rem] h-[3.9375rem] bg-save-seal bg-no-repeat bg-[length:3.9375rem] text-[1.0625rem] leading-[1.1875rem] text-white font-extrabold text-center uppercase pt-[0.8125rem] ${className}`}
    >
      <span className={`discount_class ${discountClass}`}>{discount}</span>%<br />
      Off
    </div>
  );
};

export default DiscountBadge;
