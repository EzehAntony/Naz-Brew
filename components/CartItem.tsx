import { cartStore } from "@/store/store";
import React, { useEffect } from "react";
import useStore from "../store/useStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/legacy/image";

const CartItem = (data: any) => {
  const incrementCart = cartStore((state: any) => state.incrementCart);
  const decrementCart = cartStore((state: any) => state.decrementCart);
  const router = useRouter();
  const removeFromCart = cartStore((state: any) => state.removeFromCart);

  const removeFromCartFunc = () => {
    toast(`${data.data.item.title} removed`, {
      type: "success",
      autoClose: 1000,
      theme: "dark",
      onClose: () => removeFromCart(data.data.item),
    });
  };

  useEffect(() => {
    console.log(data.data.item);
  }, [data]);

  return (
    <div className="bg-[#101010] text-white rounded-lg shadow-md p-4 mb-4">
      <div className="w-full">
        <div className="w-full  flex justify-between items-center py-4">
          <i className="bi bi-x-lg text-[red]" onClick={removeFromCartFunc}></i>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex space-x-4 justify-center items-center">
            <div className=" bg-[#262A2E] w-[100px] h-[100px] my-2  flex justify-center items-center object-cover object-center rounded-lg overflow-hidden relative">
              <Image
                src={data.data.item.image}
                onClick={() => router.push(`/item/${data.data.item._id}`)}
                alt="cup"
                layout="fill"
                className="rounded-lg"
                objectFit="cover"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-xl lg:text-3xl font-bold ">
                {data.data.item.title}
              </h1>
              <h3 className="font-semibold text-xl flex justify-start items-center ">
                <span className="text-secondary mr-2 text-2xl">₦</span>
                {data.data.item.price}
              </h3>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center ">
            <button
              onClick={() => incrementCart(data.data.item._id)}
              className="bg-secondary px-3 py-2 rounded "
            >
              <i className="bi bi-arrow-up-short"></i>
            </button>
            <p className="py-4">{data.data.quantity}</p>
            <button
              onClick={() => decrementCart(data.data.item._id)}
              className=" px-3 py-2 bg-secondary rounded"
            >
              <i className="bi bi-arrow-down-short"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
