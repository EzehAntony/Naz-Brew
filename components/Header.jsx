"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { gsap } from "gsap";
import { cartStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";

const Header = () => {
  const cartCount = cartStore((state) => state.cart);
  const ref = useRef(null);
  const g = gsap.utils.selector(ref);
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const openFunc = () => {
    if (open) {
      setOpen(false);
      gsap.to(".mobileNav", { right: "0" });
    } else {
      setOpen(true);
      gsap.to(".mobileNav", { right: "-80%" });
    }
  };

  return (
    <header
      className="header  bg-black w-full fixed top-0 left-0 z-20"
      ref={ref}
    >
      <div className="flex h-16 max-w-screen-xl justify-between items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Logo styles="" />

        <div className="flex cursor-pointer space-x-8 ">
          <div
            onClick={() => router.push("/cart")}
            className="relative justify-center items-center "
          >
            <i className="text-center text-white bg-secondary absolute rounded-full px-2 -right-4 text-sm font-sans">
              {cartCount.length}
            </i>
            <i className="bi  bi-cart2 text-2xl  text-secondary"></i>
          </div>
          <i
            onClick={openFunc}
            className="bi  bi-text-right text-2xl  text-secondary"
          ></i>
        </div>
        <nav
          className={`mobileNav w-[80%] h-screen lg:hidden text-white  absolute top-0  flex justify-center items-center bg-[#120B06] z-50 -right-[80%]`}
        >
          <i
            onClick={openFunc}
            className="bi bi-x cursor-pointer text-white absolute top-4 right-4 text-4xl "
          ></i>

          <ul className="capitalize w-full ">
            <li
              className="px-4 py-4 hover:text-4xl text-2xl"
              onClick={() => {
                openFunc();
                router.push("/home/items");
              }}
            >
              Order
            </li>
          </ul>

          <Logo styles="absolute bottom-4" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
