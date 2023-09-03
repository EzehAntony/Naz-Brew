"use client";

import React, { useLayoutEffect, useRef } from "react";
import Card from "@/components/Card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

const Categories = () => {
  const ref = useRef(null);
  const g = gsap.utils.selector(ref);
  const t1 = gsap.timeline({});
  gsap.registerPlugin(ScrollTrigger);
  const flavors = ["", "", ""];

  //gsap
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "#group div",
        {
          y: 20,
          opacity: 0.2,
        },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: "#top",
            start: "top 80%",
            end: "bottom 75%",
            scrub: 1,
          },
          stagger: {
            each: 0.1,

            ease: "power3.inOut",
          },
        }
      );
    });

    return () => ctx.revert();
  });

  return (
    <div
      ref={ref}
      id="top"
      className="bg-black  pt-10 py-4 lg:px-40 px-6 overflow-hidden"
    >
      <div className="  my-8  gap-y-4">
        <h1 className="text-3xl font-bold text-secondary">Items</h1>
        <p className="text-[white] lg:max-w-[700px] ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          suscipit beatae? Enim modi omnis adipisci officia perspiciatis est
          nesciunt quibusdam?
        </p>
      </div>
      <div id={"group"} className="  grid grid-cols-2 lg:grid-cols-4 gap-4">
        {flavors.map((e) => (
          <div id="card">
            <Card />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
