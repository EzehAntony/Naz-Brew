import React from "react";

const Hero = () => {
  return (
    <div className="h-[400px] px-5 lg:px-20 lg:h-screen bg-black w-full flex flex-col justify-center items-center pt-[100px]">
      <div className="relative flex justify-center items-center">
        <img src="/cup.png" className="w-2/6 mt-10 " alt="" />
        <i className="w-[100px] absolute"></i>
      </div>
      <div className="gap-y-4 flex flex-col w-full justify-center items-center">
        <h1 className="capitalize text-4xl font-extrabold text-secondary ">
          Get a cup of coffee
        </h1>
        <p className="text-center text-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          obcaecati consequuntur voluptates voluptas sint deleniti accusantium
          eos a repudiandae odio.
        </p>
        <button className="bg-secondary rounded-md text-white flex justify-center items-center gap-x-4 w-full h-[50px]  text-2xl">
          <i className="bi bi-cart"></i>
          <p className="text-xl">Buy Now</p>
        </button>

        <div className="w-full inline-flex justify-center items-center ">
          <div className="text-secondary text-xl relative bg-[#1D1D1D] rounded-full py-1 px-2">
            <i className="bi bi-cup-hot-fill absolute animate-ping"></i>
            <i className="bi bi-cup-hot-fill "></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
