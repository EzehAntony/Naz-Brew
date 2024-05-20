import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import React from "react";

const page = () => {
  return (
    <div className="w-full overflow-x-hidden ">
      <Hero />
      <Categories />
    </div>
  );
};

export default page;
