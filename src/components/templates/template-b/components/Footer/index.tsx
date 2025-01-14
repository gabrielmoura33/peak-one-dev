import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#FFFF] py-8 mt-10 border border-[#e0e0e0]">
      <div className="max-w-[85rem] mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/images/logo.png" 
              alt="Selos de Segurança" 
              className="h-12"
            />
          </div>
                    

          <div className="flex gap-4 text-sm text-gray-600">
            <a href="/shipping-returns" className="hover:text-gray-900">
              Shipping & Returns
            </a>
            <span>|</span>
            <a href="/contact" className="hover:text-gray-900">
              Contact Us
            </a>
            <span>|</span>
            <a href="/privacy-policy" className="hover:text-gray-900">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="/terms-conditions" className="hover:text-gray-900">
              Terms and Conditions
            </a>
          </div>

          <div className="text-sm text-gray-600 mt-4">
            <p>Copyright © {new Date().getFullYear()} Oricle. All Rights Reserved.</p>
          </div>
          
          <div className="mt-6">
            <img 
              src="/images/footer_card.png" 
              alt="Footer Card" 
              className="h-[54px] w-[320px] object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
