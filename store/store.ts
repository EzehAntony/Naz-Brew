import { create } from "zustand";
import { persist } from "zustand/middleware";

export const cartStore = create(
  persist(
    (set, get: any) => ({
      cart: [],
      total: 0,

      addToCart: (data: any) => {
        const oldCart = get().cart;
        const isInCart = oldCart.find(
          (cartItem: any) => cartItem.item._id === data._id
        );

        if (isInCart) {
          return; // Item already in cart, no action needed
        } else {
          const newCart = [...oldCart, { item: data, quantity: 1 }];
          return set({ cart: newCart });
        }
      },
      removeFromCart: (data: any) => {
        const cart = get().cart;
        const newCart = cart.filter(
          (cartItem: any) => cartItem.item._id !== data._id
        );
        return set({ cart: newCart });
      },

      incrementCart: (data: any) => {
        const cart = get().cart;
        const indexOfItem = cart.findIndex(
          (cartItem: any) => cartItem.item._id === data._id
        );

        if (indexOfItem !== -1) {
          const currentQuantity = cart[indexOfItem].quantity;

          // Check if the quantity is already 10 or more
          if (currentQuantity >= 10) {
            console.log("Maximum quantity reached");
            return;
          }

          const newCart = cart.map((cartItem: any, index: number) => {
            if (index === indexOfItem) {
              return { ...cartItem, quantity: currentQuantity + 1 };
            }
            return cartItem;
          });
          return set({ cart: newCart });
        }
      },
      decrementCart: (data: any) => {
        const cart = get().cart;
        const indexOfItem = cart.findIndex(
          (item: any) => item._id === data._id
        );
        if (indexOfItem !== -1 && cart[indexOfItem].quantity >= 2) {
          const newCart = cart.map((item: any, index: number) => {
            if (index === indexOfItem) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
          return set({ cart: newCart });
        }
      },
      totalCart: () => {
        const cart = get().cart;
        const total = cart.reduce((sum: number, item: any) => {
          return sum + item.item.price * item.quantity;
        }, 0);
        console.log(total);

        return set({ total: total });
      },
      revalidate: (data: any) => {
        const cart = get().cart;
        const index = cart.findIndex((item: any) => item._id === data._id);
        cart[index].quantity = data.quantity;
        return set({ cart: cart });
      },
    }),
    { name: "cart" }
  )
);
