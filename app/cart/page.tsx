"use client";

import Logo from "@/components/Logo";
import { Helpers } from "@/helpers/data";
import { cartStore } from "@/store/store";
import { useEffect, useState } from "react";

const page = () => {
  const cart = cartStore((state) => state.cart);
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    console.log(cart);
    if (cart.length > 0) {
      Promise.all(
        cart.map((id: string) => {
          return Helpers.fetchData(`/api/items/find/${id}`);
        })
      ).then((res: any) => setProducts(res));
    }
  }, [cart]);

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className=" text-center flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
            <Logo styles="w-[100px]" />
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {/* Item */}
              {products &&
                products.map((e: any) => (
                  <li className="flex items-center gap-4" key={e.data._id}>
                    <img
                      src="data:image/jpeg;base64,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"
                      alt=""
                      className="h-16 w-16 rounded object-cover"
                    />

                    <div>
                      <h3 className="text-sm text-gray-900">{e.data.title}</h3>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <form>
                        <label htmlFor="Line1Qty" className="sr-only">
                          Quantity
                        </label>

                        <input
                          type="number"
                          min="1"
                          value="1"
                          id="Line1Qty"
                          className="h-8 w-12 rounded border-[#714131] bg-[#714131] p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </form>

                      <button className="text-gray-600 transition hover:text-red-600">
                        <span className="sr-only">Remove item</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
            </ul>

            <div className="fixed left-0 w-full bottom-4 px-4 flex justify-end border-t border-[#714131] pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>£250</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>VAT</dt>
                    <dd>£25</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Discount</dt>
                    <dd>-£20</dd>
                  </div>

                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>£200</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <a
                    href="#"
                    className="block rounded bg-secondary px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
