"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { cartStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Image from "next/legacy/image";
import Logo from "./Logo";
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
      id="card"
      className=" text-black w-full flex flex-col justify-center items-center bg-[#3b23144f] rounded-lg overflow-hidden cursor-pointer"
    >
      <div
        onClick={() => router.push(`/item/${data._id}`)}
        className="relative min-h-[150px] w-full  lg:w-[250px] lg:h-[200px] min-w-[150px] "
      >
        <Image
          src={data.image}
          layout="fill"
          objectFit="cover"
          alt={data.title}
        />
      </div>
      <h3 className="text-white w-full text-start text-2xl my-2 px-2">
        {data.title}
      </h3>
      <button
        onClick={addToCart}
        className="bg-white w-3/4 mx-auto my-4 rounded-lg h-[40px] text-2xl font-bold "
      >
        Brew
      </button>
    </div>
  );
};

export default Card;
