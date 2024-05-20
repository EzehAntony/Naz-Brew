import { cartStore } from "@/store/store";
import React from "react";
import useStore from "../store/useStore";
import { useRouter } from "next/navigation";

const CartItem = (data: any) => {
  console.log(data)
  const incrementCart = cartStore((state: any) => state.incrementCart);
  const decrementCart = cartStore((state: any) => state.decrementCart);
  const router = useRouter();

  return (
    <div className="md:w-3/4" onClick={() => router.push(`/item/${data.data.item._id}`)}>
      <div className="bg-[#101010] text-white rounded-lg shadow-md p-4 mb-4">
        <table className="w-full">
          <p className="font-semibold py-2">{data.data.item.title}</p>
          <div className="w-full flex justify-between items-center">
            <img
              className="h-28 w-28 mr-4 rounded"
              src="data:image/jpeg;base64,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"
              alt="Product image"
            />

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
