"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./page.module.css";
import { gsap } from "gsap";

export default function Home() {
  const ref = useRef(null);
  const g = gsap.utils.selector(ref);
  const t1 = gsap.timeline({});
  const router = useRouter();

  //gsap
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("#main", { visibility: "visible" });
      t1.from("#walls div", {
        xPercent: 100,
        stagger: {
          each: 0.2,
        },
      });
      t1.to("#walls", { display: "none" }, "<+0.5")
        .from(
          `#text h3`,
          {
            scale: "1.5",
            duration: 0.1,
            y: 50,
            opacity: 0,
            stagger: {
              each: 0.1,
            },
          },
          "<+0.3"
        )
        .from(
          g("#text i"),
          1,
          {
            opacity: 0,
            y: -50,
            onComplete: () => {
              router.push("/home");
            },
          },
          "<+2"
        );
    });

    return () => ctx.revert();
  });

  return (
    <main
      className="main bg-black min-h-screen flex justify-center items-center border-0 max-w-full overflow-x-hidden invisible "
      id="main"
      ref={ref}
    >
      <div className="text-secondary mr-4 text-4xl">
        <i className="bi bi-cup-hot-fill absolute animate-ping"></i>
        <i className="bi bi-cup-hot-fill "></i>
      </div>
      <div
        className="font-bold transform-[rotate(-90deg)] flex items-baseline p-0 m-0 capitalize text-4xl text-white "
        id="text"
      >
        <span className="flex text-secondary">
          <h3>N</h3>
          <h3>a</h3>
          <h3>z</h3>
        </span>
        <h3>b</h3>
        <h3>r</h3>
        <h3>e</h3>
        <h3>w</h3>
        <i className="bg-secondary w-[20px] h-[20px] rounded-md "></i>
      </div>

      <div className="w-full h-screen absolute top-0" id="walls">
        <div className="bg-[#464646] w-full h-screen absolute top-0"></div>
        <div className="bg-[#313131] w-full h-screen absolute top-0"></div>
        <div className="bg-[#202020] w-full h-screen absolute top-0"></div>
        <div className="bg-[#111111] w-full h-screen absolute top-0"></div>
        <div className="bg-[#000] w-full h-screen absolute top-0"></div>
      </div>
    </main>
  );
}
