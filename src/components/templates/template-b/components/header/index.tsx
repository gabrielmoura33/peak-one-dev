import React from 'react';


const Header = () => {
  return (
    <header className="float-left w-full h-[4.875rem] relative shadow-md px-[15%]">
      <img src="/images/logo.png" alt="Logo" className="float-left w-[8.75rem] mt-[0.8125rem]" />
      <img src="/images/safe-checkout.png" alt="" className='float-right w-[10.5625rem] mt-[0.875rem]' />
    </header>
  );
};

export default Header;
