"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { cartStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Image from "next/legacy/image";
const Card = ({ data }: { data: any }) => {
  const cart = cartStore((state: any) => state.cart);
  const increment = cartStore((state: any) => state.addToCart);
  const decrement = cartStore((state: any) => state.removeFromCart);
  const router = useRouter();
  const addToCart = () => {
    if (cart.length >= 10) {
      decrement(data);
    } else {
      increment(data);
      console.log(data);
    }
  };

  return (
    <div
      onClick={() => router.push(`/item/${data._id}`)}
      id="card"
      className="group/card text-black w-full lg:w-[220px]  bg-[#3b23144f] rounded-lg overflow-hidden cursor-pointer"
    >
      <div className="w-full ">
        <div className=" bg-[#262A2E] w-full  flex justify-center items-center object-cover object-center rounded-lg overflow-hidden relative">
          <Image
            src={data.image}
            priority
            alt="cup"
            layout="fill"
            className="rounded-lg"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="p-2">
        <div>
          <h5 className="my-4 group-hover/card:animate-pulse text-2xl font-bold tracking-tight text-gray-900 text-white">
            {data.title}
          </h5>
        </div>

        <div
          onClick={addToCart}
          className=" w-full inline-flex text-white justify-center gap-x-4 items-center px-3 py-2  bg-secondary rounded-lg focus:outline-none "
        >
          <h2 className="font-bold text-xl">Brew</h2>
          <div className="relative flex justify-center items-center">
            <i className="bi bi-cup-hot-fill text-xl"></i>
            <i className="bi bi-cup-hot-fill text-xl absolute group-hover/card:animate-ping"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
