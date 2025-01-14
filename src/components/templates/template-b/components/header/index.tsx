import React from 'react';
import { CONSTANTS } from './constants';

const Header = () => {
  return (
    <header className="float-left w-full h-[4.875rem] relative shadow-md px-[10%]">
      <img src={CONSTANTS.LOGO} alt="Logo" className="float-left w-[8.75rem] mt-[0.8125rem]" />
      <img src={CONSTANTS.SAFE_CHECKOUT} alt="" className='float-right w-[10.5625rem] mt-[0.875rem]' />
    </header>
  );
};

export default Header;
