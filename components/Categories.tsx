"use client";

import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import Card from "@/components/Card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { allData } from "@/allData";
import axios from "axios";
import { Helpers } from "@/helpers/data";

const Categories = () => {
  const ref = useRef(null);
  const g = gsap.utils.selector(ref);
  const t1 = gsap.timeline({});
  gsap.registerPlugin(ScrollTrigger);
  const flavors = ["", "", ""];
  const [products, setProducts] = useState<any>();
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const allData = async () => {
      setLoading(true);
      const data = await Helpers.fetchData(
        "http://localhost:3000/api/items/find"
      );
      setProducts(data);
      setLoading(false);
    };
    allData();
  }, []);

  /*   useEffect(() => {
    setLoading(true);
    axios(`/api/items/find`)
      .then((res: any) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); */

  useEffect(() => {});

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
        {products &&
          products.data.map((e: any, i: any) => (
            <div key={i} id="card">
              <Card data={e} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
