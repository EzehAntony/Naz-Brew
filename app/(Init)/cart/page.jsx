"use client";

import CartItem from "@/components/CartItem";
import { cartStore } from "@/store/store";
import { useEffect, useState } from "react";
import { PaystackButton, usePaystackPayment } from "react-paystack";
import { ToastContainer, toast } from "react-toastify";
import { useStore } from "../../../store/useStore";
import { useRouter } from "next/navigation";

const page = () => {
  const cart = cartStore((state) => state.cart);
  const total = cartStore((state) => state.total);
  const totalFunc = cartStore((state) => state.totalCart);
  const router = useRouter();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    console.log(name, value);
  };

  useEffect(() => {
    totalFunc();
    if (cart.length <= 0) {
      toast("Empty Cart", {
        type: "warning",
        autoClose: 2000,
        theme: "dark",
        onClose: () => router.push("/home/items"),
      });
    }
  }, [cart]);

  const config = {
    ref: Math.floor(Math.random() * 1000000000 + 1),
    email: form.email,
    amount: `${total + 1000}00`, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
    currency: "NGN",
    channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    metadata: {
      custom_fields: [
        {
          display_name: "firstname",
          variable_name: "firstname",
          value: form.firstname,
        },
        {
          display_name: "lastname",
          variable_name: "lastname",
          value: form.lastname,
        },
        {
          display_name: "address",
          variable_name: "address",
          value: form.lastname,
        },
      ],
    },
  };

  // you can call this function anything
  const onSuccess = () => {
    toast("Successfull Transaction", {
      theme: "dark",
    });
  };
  // you can call this function anything
  const onClose = () => {
    toast.error("Closed Transaction", {
      theme: "dark",
    });
  };

  const payWithPaystack = usePaystackPayment(config);

  const pay = () => {
    payWithPaystack(onSuccess, onClose);
  };
  return (
    <div className="bg-[#000] text-white min-h-screen py-8 pt-[80px] ">
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-semibold mb-4">Shopping Cart</h1>
        <div className="md:grid grid-cols-2 gap-4">
          <div className="flex flex-col ">
            {cart && cart.map((e, i) => <CartItem data={e} key={i} />)}
          </div>

          <div>
            <div className="md:w-full">
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
                  <span className="font-semibold">₦ {total + 1000}</span>
                </div>
                {/*               <button className="bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full">
                Checkout
              </button> */}
              </div>
            </div>

            <form
              id="paymentForm"
              className="bg-[#101010] rounded-lg shadow-md p-6 mt-4"
            >
              <div className="form-group flex flex-col space-y-2 my-2">
                <label className="font-bold ">Email Address</label>
                <input
                  className=" text-white h-[40px] px-4 bg-[#75757521] rounded-sm "
                  type="email"
                  onChange={handleChange}
                  name="email"
                  id="email-address"
                  required
                  placeholder="example@gmail.com"
                />
              </div>

              <div className="form-group flex flex-col space-y-2 my-2">
                <label className="font-bold ">Firstname</label>
                <input
                  onChange={handleChange}
                  className=" text-white h-[40px] px-4 bg-[#75757521] rounded-sm "
                  type="text"
                  name="firstname"
                  id="first-name"
                  placeholder="Anthony"
                />
              </div>
              <div className="form-group flex flex-col space-y-2 my-2">
                <label className="font-bold ">Lastname</label>
                <input
                  className=" text-white h-[40px] px-4 bg-[#75757521] rounded-sm "
                  onChange={handleChange}
                  type="text"
                  name="lastname"
                  id="last-name"
                  placeholder="Ezeh"
                />
              </div>
              <div className="form-group flex flex-col space-y-2 my-2">
                <label className="font-bold ">Mailing address</label>
                <input
                  className=" text-white h-[40px] px-4 bg-[#75757521] rounded-sm "
                  type="text"
                  id="last-name"
                  onChange={handleChange}
                  name="address"
                  placeholder="2 aladelola street ikosi ketu lagos nigeria"
                />
              </div>
              <button
                type="button"
                onClick={() => pay()}
                className="bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full"
              >
                Pay
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default page;
