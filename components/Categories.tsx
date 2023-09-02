import React from "react";
import Card from "@/components/Card";

const Categories = () => {
  return (
    <div className="bg-primary pt-10 py-4 lg:px-20 px-6">
      <div className="  my-8  gap-y-4">
        <h1 className="text-3xl font-bold text-secondary">Items</h1>
        <p className="text-[white]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          suscipit beatae? Enim modi omnis adipisci officia perspiciatis est
          nesciunt quibusdam?
        </p>
      </div>
      <div className="  grid grid-cols-2  gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Categories;
