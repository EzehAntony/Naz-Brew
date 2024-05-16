import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const cartStore = create((set, get) => ({
  cart: [],
  total: 0,

  addToCart: (action) => {
    const cart = get().cart;
    if (cart.length >= 10) {
    } else {
      if (cart.some((data) => data._id == action._id)) {
      } else {
        set((state) => ({
          cart: [...state.cart, { item: action.item, quantity: 1 }],
        }));
      }
    }
  },

  incrementCart: (action) => {
    const cart = get().cart;
    const index = cart.findIndex((cartItem) => cartItem.item._id === action);

    if (index !== -1) {
      set((state) => ({
        cart: [
          {
            item: state.cart[index].item,
            quantity: state.cart[index].quantity + 1,
          },
        ],
      }));
    } else {
    }
  },
 

  decrementCart: (action) => {
    const cart = get().cart;
    const index = cart.findIndex((cartItem) => cartItem.item._id === action);

    if (index !== -1) {
      set((state) => ({
        cart: [
          {
            item: state.cart[index].item,
            quantity: state.cart[index].quantity + 1,
          },
        ],
      }));
    } else {
    }
  },
 
  removeFromCart: (action) => {
    set((state) => ({
      cart: state.cart.filter((data) => data._id !== action._id),
    }));
  },
  clearCart: () => set(() => ({ cart: [] })),
  totalAmount: () => {
    const cart = get().cart;
    if (cart.length > 0) {
      let ammount = cart.map((e) => {
        return e.price;
      });

      let a = ammount.reduce((a, b) => {
        return a + b;
      });
      set(() => ({ total: a }));
    } else {
    }
  },
}));
