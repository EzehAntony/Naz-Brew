"use client";
import Card from "@/components/Card";
import CardSkeleton from "@/components/CardSkeleton";
import Header from "@/components/Header";
import { Helpers } from "@/helpers/data";
import React, { ReactElement, useEffect, useState } from "react";

const page = (): ReactElement => {
  const flavors = ["", "", ""];
  const [products, setProducts] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const allData = async () => {
      setLoading(true);
      const data = await Helpers.fetchData("/api/items/find");
      setProducts(data);
      setLoading(false);
    };
    allData();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col  items-center pt-[60px] px-4 py-10 relative text-white bg-[#000]">
      <Header />
      <div className=" w-full lg:max-w-[920px]   my-8  space-y-4 ">
        <h1 className="text-3xl font-bold text-secondary">Items</h1>
        <p className="text-[white] lg:max-w-[900px] ">
          Experience Nazbrew's hand-crafted coffee, aromatic teas, and
          daily-baked pastries. Our menu caters to all, with vegan and
          gluten-free options, plus seasonal specialties to enjoy.
        </p>
      </div>
      <div
        id={"group"}
        className="grid grid-cols-2 px-4 lg:grid-cols-4 md:grid-cols-3  gap-4 place-items-center justify-center items-center"
      >
        {products &&
          products.data.map((e: any, i: any) => (
            <div key={i} id="card">
              <Card data={e} />
            </div>
          ))}
      </div>
      {!products && (
        <div className="w-full lg:max-w-[920px] grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 justify-center items-center  ">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}
    </div>
  );
};

export default page;
