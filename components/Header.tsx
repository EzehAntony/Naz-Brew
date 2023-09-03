"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { gsap } from "gsap";

const Header = () => {
  const ref = useRef(null);
  const g = gsap.utils.selector(ref);
  const [open, setOpen] = useState(true);

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
    <header className="header bg-black w-full fixed z-20" ref={ref}>
      <div className="mx-5 flex h-16 max-w-screen-xl justify-between items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Logo styles="" />

        <div onClick={openFunc} className="cursor-pointer">
          <i className="bi  bi-text-right text-2xl  text-secondary"></i>
        </div>
        <nav
          className={`mobileNav w-[80%] h-screen lg:hidden text-white  absolute top-0  flex justify-center items-center bg-[#120B06] z-10 -right-[80%]`}
        >
          <i
            onClick={openFunc}
            className="bi bi-x cursor-pointer text-white absolute top-4 right-4 text-4xl "
          ></i>
          <ul className="capitalize w-full ">
            <li className="px-4 py-4 hover:text-4xl text-2xl">Order</li>
            <li className="px-4 py-4 hover:text-4xl text-2xl">Contact Us</li>
            <li className="px-4 py-4 hover:text-4xl text-2xl">about</li>
          </ul>

          <Logo styles="absolute bottom-4" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
