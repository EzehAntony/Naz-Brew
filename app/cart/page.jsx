"use client";

import CartItem from "@/components/CartItem";
import { cartStore } from "@/store/store";
import { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
import { ToastContainer, toast } from "react-toastify";
import { useStore } from "../../store/useStore";

const page = () => {
  const cart = cartStore((state) => state.cart);
  const total = cartStore((state) => state.total);
  const totalFunc = cartStore((state) => state.totalCart);

  useEffect(() => {
    console.log(totalFunc());
  }, [cart]);

  const config = {
    reference: Math.floor(Math.random() * 1000000000 + 1),
    currency: "NGN",
    email: "crayonno.o@example.com",
    amount: `${total}00`, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
    bearer: "subaccount",
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    toast("Closed Transaction");
  };

  const componentProps = {
    ...config,
    text: "Checkout",
    onSuccess: (reference) => console.log(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <div className="bg-[#000] min-h-screen py-8 ">
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          {cart && cart.map((e, i) => <CartItem data={e} key={i} />)}

          <div className="md:w-1/4">
            <div className="bg-[#101010] rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{total}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">shipping</span>
                <span className="font-semibold">1000</span>
              </div>

              <hr className="my-2 border-[#714131]" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">₦ {total}</span>
              </div>
              {/*               <button className="bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full">
                Checkout
              </button> */}
            </div>
          </div>
        </div>
        <form
          id="paymentForm"
          className="bg-[#101010] rounded-lg shadow-md p-6 mt-4"
        >
          <div className="form-group flex flex-col space-y-2 my-2">
            <label className="font-bold ">Email Address</label>
            <input
              className=" text-white h-[40px] bg-[#75757521] rounded-sm "
              type="email"
              id="email-address"
              required
            />
          </div>
          <div className="form-group flex flex-col space-y-2 my-2">
            <label className="font-bold ">Amount</label>
            <input
              className=" text-white h-[40px] bg-[#75757521] rounded-sm "
              type="tel"
              id="amount"
              required
            />
          </div>
          <div className="form-group flex flex-col space-y-2 my-2">
            <label className="font-bold ">First Name</label>
            <input
              className=" text-white h-[40px] bg-[#75757521] rounded-sm "
              type="text"
              id="first-name"
            />
          </div>
          <div className="form-group flex flex-col space-y-2 my-2">
            <label className="font-bold ">Last Name</label>
            <input
              className=" text-white h-[40px] bg-[#75757521] rounded-sm "
              type="text"
              id="last-name"
            />
          </div>
          <div className="form-submit"></div>
          <PaystackButton
            {...componentProps}
            className="bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full"
          />
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default page;
