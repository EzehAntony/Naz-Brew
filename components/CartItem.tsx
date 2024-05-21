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

  return (
    <div className="md:w-3/4">
      <div className="bg-[#101010] text-white rounded-lg shadow-md p-4 mb-4">
        <table className="w-full">
          <p className="font-semibold py-2 text-2xl">{data.data.item.title}</p>
          <div className="w-full  flex justify-between items-center py-4">
            <p
              onClick={() => router.push(`/item/${data.data.item._id}`)}
              className="text-white text-xl font-semibold py-2"
            >
              View Item
            </p>
            <i
              className="bi bi-x-lg text-[red]"
              onClick={removeFromCartFunc}
            ></i>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className=" bg-[#262A2E] w-[150px] h-[150px] my-2  flex justify-center items-center object-cover object-center rounded-lg overflow-hidden relative">
              <Image
                src={data.data.item.image}
                priority
                alt="cup"
                layout="fill"
                className="rounded-lg h-28 w-28 mr-4"
                objectFit="cover"
              />
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
        </table>
        <h3 className="font-semibold text-xl flex justify-start items-center ">
          <span className="text-secondary mr-2 text-2xl">₦</span>
          {data.data.item.price}
        </h3>
      </div>
    </div>
  );
};

export default CartItem;
