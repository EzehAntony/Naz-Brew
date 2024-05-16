import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-[400px] px-5 lg:px-60 lg:h-screen bg-black w-full flex flex-col justify-center items-center  relative">
      <div className="relative flex justify-center items-center pt-[100px]">
        <Image src={"/cup.png"} alt="cup" height={200} width={200} />
        <i className="w-[100px] absolute"></i>
      </div>
      <div className="gap-y-4 flex flex-col w-full lg:gap-y-6 justify-center items-center">
        <h1 className="capitalize text-4xl lg:text-7xl font-extrabold text-secondary text-center ">
          Get a cup of coffee
        </h1>
        <p className="text-white text-center text-md">
          Your go-to coffee shop for rich, ethically sourced brews, fresh
          pastries, and a cozy vibe. Enjoy a welcoming space with local art,
          live music, and a friendly community atmosphere.
        </p>
        <button className="bg-secondary lg:w-[400px] rounded-md text-white flex justify-center items-center gap-x-4 w-full h-[50px]  text-2xl">
          <i className="bi bi-cart"></i>
          <p className="text-xl">Buy</p>
        </button>

        <div className="w-full inline-flex justify-center items-center ">
          <div className="text-secondary text-xl  relative bg-[#1D1D1D] rounded-full py-1 px-2">
            <i className="bi bi-cup-hot-fill absolute animate-ping"></i>
            <i className="bi bi-cup-hot-fill "></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
