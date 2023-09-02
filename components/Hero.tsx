import React from "react";

const Hero = () => {
  return (
    <div className="h-[400px] px-5 lg:px-20 lg:h-screen bg-primary w-full flex flex-col justify-center items-center">
      <img src="/cup.png" className="w-2/6 mt-10 " alt="" />
      <div className="gap-y-4 flex flex-col w-full justify-center items-center">
        <h1 className="capitalize text-4xl font-extrabold text-secondary ">
          Get a cup of coffee
        </h1>
        <p className="text-center text-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          obcaecati consequuntur voluptates voluptas sint deleniti accusantium
          eos a repudiandae odio.
        </p>
        <button className="bg-secondary flex justify-center items-center gap-x-4 w-full h-[50px]  text-2xl">
          <i className="bi bi-cart"></i>
          <p>Buy Now</p>
        </button>
      </div>
    </div>
  );
};

export default Hero;
