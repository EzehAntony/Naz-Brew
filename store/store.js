import { create } from "zustand"

export const cartStore = create((set, get) => ({
    cart: [],
    total: 0,

    addToCart: (action) => {
        const cart = get().cart;
        if (cart.length >= 10) {

        } else {
            if (cart.some((data) => data._id == action._id)) {
            } else {
                set((state) => ({ cart: [...state.cart, action] }))

            }

        }

    },
    removeFromCart: (action) => {
        set((state) => ({ cart: state.cart.filter((data) => data._id !== action._id) }))
    },
    clearCart: () => set((state) => ({ cart: [] })),
    totalAmount: () => {
        const cart = get().cart;
        if (cart.length > 0) {
            let ammount = cart.map((e) => {
                return e.price
            })

            let a = ammount.reduce((a, b) => { return a + b })
            set(() => ({ total: a }))
        } else {

        }

    }
}))