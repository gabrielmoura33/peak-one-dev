"use client";
import React, { useState, useEffect } from 'react';

const PromotionTimer = () => {
  const [timeLeft, setTimeLeft] = useState(7 * 60 + 35); // 7:35 em segundos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
  <div className="float-left w-full bg-[#fff1af] rounded-[0.4375rem] p-[0.75rem_3.125rem] flex flex-wrap justify-center items-center">
      <div className="w-[3.9375rem] h-[3.9375rem] bg-save-seal bg-no-repeat bg-[length:3.9375rem] text-[1.0625rem] leading-[1.1875rem] text-white font-extrabold text-center uppercase pt-[0.8125rem]">
        <span className="discount_class">50</span>%<br />Off
      </div>
      <div className="w-[calc(100%-3.9375rem)] text-left pl-[0.75rem]">
        <h3 className="text-[1.1875rem] leading-[1.4375rem] text-black font-bold tracking-[0.03125rem] uppercase">
          <span className="text-[#ff0000]">Hurry!</span> Limited To 100 Spots Only!
        </h3>
        <p className="text-[1.1875rem] leading-[1.4375rem] text-black tracking-[0.03125rem] mt-[0.3125rem]">
          Your spot is reserved for
          <img className="inline-block align-middle m-[-0.1875rem_0.375rem_0_0.5rem] w-[0.9375rem]" src="/images/clock-icon.png" alt="" width="30" height="36" />
          <span id="stopwatch" className="font-bold">      
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </p>
      </div>      
    </div>
  );
};

export default PromotionTimer;
