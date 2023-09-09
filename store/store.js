import { create } from "zustand"

export const cartStore = create((set, get) => ({
    cart: [],
    addToCart: (action) => {
        const cart = get().cart;
        if (cart.length >= 10) {

        } else {
            if (cart.includes(action)) {

            } else {
                set((state) => ({ cart: [...state.cart, action] }))

            }

        }

    },
    removeFromCart: (action) => {
        set((state) => ({ cart: state.cart.filter((id) => id !== action) }))
        console.log(`removed ${action} from cart...`);
    },
    clearCart: () => set((state) => ({ cart: [] }))
}))