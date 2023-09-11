"use client";

import CartItem from "@/components/CartItem";
import Logo from "@/components/Logo";
import { Helpers } from "@/helpers/data";
import { cartStore } from "@/store/store";
import { useEffect, useState } from "react";

const page = () => {
  const cart = cartStore((state) => state.cart);
  const totalFunc = cartStore((state) => state.totalAmount);
  const total = cartStore((state) => state.total);
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    totalFunc();
  }, [total]);

  return (
    <div className="bg-[#000] h-screen py-8 ">
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          {cart && cart.map((e: any) => <CartItem data={e} key={e._id} />)}

          <div className="md:w-1/4">
            <div className="bg-[#101010] rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{total}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">shipping</span>
                <span className="font-semibold">25</span>
              </div>

              <hr className="my-2 border-[#714131]" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">₦ {total}</span>
              </div>
              <button className="bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
