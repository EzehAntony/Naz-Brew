"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import DescriptionSkeleton from "@/components/DescriptionSkeleton";
import { cartStore } from "@/store/store";
import { Helpers } from "@/helpers/data";
import Image from "next/legacy/image";
import useStore from "@/store/useStore";
const page = ({
  params,
}: {
  params: {
    id: String;
    title: String;
    description: String;
    available: Boolean;
    price: Number;
  };
}) => {
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState(false);
  const cart = useStore(cartStore, (state: any) => state.cart);
  const addToCart = cartStore((state: any) => state.addToCart);
  const removeFromCart = cartStore((state: any) => state.removeFromCart);

  const addToCartFunc = () => {
    addToCart(product);
  };

  const removeFromCartFunc = () => {
    removeFromCart(product);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const productData = await Helpers.fetchData(
        `/api/items/find/${params.id}`
      );
      if (productData?.data) {
        setProduct(productData.data);
      } else {
        setProduct(productData);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <section className="w-full min-h-screen text-gray-600 text-white bg-[#000] body-font overflow-hidden lg:pt-[80px]">
      <div className="container px-5 py-24 mx-auto w-full">
        <div className="w-full mx-auto flex flex-col lg:flex-row ">
          <div className="w-full">
            {product && (
              <div className=" dark:bg-[#262A2E] w-full h-[400px] lg:h-[500px] flex justify-center items-center object-cover object-center rounded-lg overflow-hidden relative">
                <Image
                  src={
                    "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  priority
                  alt="cup"
                  layout="fill"
                  className="rounded-lg"
                  objectFit="cover"
                />
              </div>
            )}

            {!product && (
              <div className="animate-pulse bg-[#101010] w-full h-[400px] rounded-lg relative"></div>
            )}
          </div>
          <div className=" w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              <Logo styles={"w-[0px] "} />
            </h2>
            {product && (
              <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium my-4">
                {product.title}
              </h1>
            )}

            <div>
              {/* Title skeleton */}
              {!product && (
                <div className="animate-pulse my-4 w-3/4 bg-[#101010] h-[10px] rounded-md "></div>
              )}
            </div>

            <div>
              {/* description and description skeleton */}
              <p className="leading-relaxed">{product?.description}</p>
              {!product && <DescriptionSkeleton />}
            </div>

            <div className=" w-full flex flex-col justify-between mt-8 space-y-4">
              <div>
                <span className="title-font font-medium text-2xl dark:text-white text-gray-900">
                  {product && `₦ ${product.price}`}
                </span>
                {!product && (
                  <div className="animate-pulse my-4 w-[130px] h-[20px] bg-[#101010] rounded-md "></div>
                )}
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => addToCartFunc()}
                  className="flex w-full justify-center items-center text-white bg-secondary  border-0 py-2 px-6 focus:outline-none hover:bg-primary rounded"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => removeFromCartFunc()}
                  className="flex w-full justify-center items-center  bg-white text-black  border-0 py-2 px-6 focus:outline-none hover:bg-primary rounded"
                >
                  Remove from cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
