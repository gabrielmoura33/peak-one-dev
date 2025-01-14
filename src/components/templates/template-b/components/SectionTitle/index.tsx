import React from 'react';

export enum IconType {
  QUANTITY = 'quantity',
  USER = 'user',
  SHIP = 'ship',
  PAYMENT = 'payment'
}

interface SectionTitleProps {
  icon: IconType;
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon, title, subtitle }) => {
  const getIcon = () => {
    switch (icon) {
      case IconType.QUANTITY:
        return '/images/frm-hdr-icn1.png';
      case IconType.USER:
        return '/images/frm-hdr-icn2.png';
      case IconType.SHIP:
        return '/images/frm-hdr-icn3.png';
      case IconType.PAYMENT:
        return '/images/frm-hdr-icn4.png';
      default:
        return "";
    }
  };

  return (
    <div className="float-left w-full text-left flex items-center">
        <div className="w-[50px]"><img src={getIcon()} alt="" width="100" height="80" /></div>
        <div className="pl-2">
            <h3 className='text-[1.75rem] leading-[1.75rem] text-black font-bold'>{title}</h3>
            <p className='text-[0.9375rem] leading-[1.3125rem] text-black tracking-[0.01875rem] mt-[0.3125rem]'>{subtitle}</p>
        </div>
    </div>
  );
};

export default SectionTitle;
