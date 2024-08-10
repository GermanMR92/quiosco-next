import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

// We define the store interface with the variables and functions that we will use
interface Store {
    order: OrderItem[];
    addToOrder: (product: Product) => void; // Add a product to the order
    increaseQuantity: (id: Product['id']) => void; // Increase the quantity of a product in the order
    decreaseQuantity: (id: Product['id']) => void; // Decrease the quantity of a product in the order
    getProductInfo: (id: Product['id']) => OrderItem | undefined; // Get the product information
    disableIncrease: (id: Product['id']) => boolean; // control that the quantity is not greater than MAX_QUANTITY
    disableDecrease: (id: Product['id']) => boolean; // control that the quantity is not less than MIN_QUANTITY
    removeItem: (id: Product['id']) => void;  // Remove a product from the order
    MAX_QUANTITY: number; // Maximum quantity of a product in the order
    MIN_QUANTITY: number; // Minimum quantity of a product in the order
}

/**
 * Represents the store state.
 */
export const useStore = create<Store>((set, get) => ({
    order: [],
    MAX_QUANTITY: 5,
    MIN_QUANTITY: 1,

    addToOrder: (product) => {
        // We extract unnecessary values
        const { categoryId, image, description, is_active, ...data } = product;

        let order: OrderItem[] = [];

        if (get().order.find((item) => item.id === product.id)) {
            order = get().order.map((item) => item.id === product.id ?
                {
                    ...item,
                    quantity: item.quantity + 1,
                    subtotal: (item.quantity + 1) * product.price,
                }
                : item
            );
        } else {
            order = [
                ...get().order,
                {
                    ...data,
                    quantity: 1,
                    subtotal: 1 * product.price,
                },
            ];
        }

        // We modify the state with the new order
        set(() => ({
            order,
        }));
    },

    increaseQuantity: (id) => {

        // control that the quantity is not greater than MAX_QUANTITY
        if (get().order.find((item) => item.id === id && item.quantity === get().MAX_QUANTITY)) {
            return;
        }

        set((state) => ({
            order: state.order.map((item) => item.id === id ?
                {
                    ...item,
                    quantity: item.quantity + 1,
                    subtotal: (item.quantity + 1) * item.price,
                }
                : item
            )
        }));
    },

    decreaseQuantity: (id) => {

        // control that the quantity is not less than MIN_QUANTITY
        if (get().order.find((item) => item.id === id && item.quantity === get().MIN_QUANTITY)) {
            return;
        }

        set((state) => ({
            order: state.order.map((item) => item.id === id ?
                {
                    ...item,
                    quantity: item.quantity - 1,
                    subtotal: (item.quantity - 1) * item.price,
                }
                : item
            )
        }))
    },

    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter((item) => item.id !== id) // get all the products except the one we want to remove
        }));
    },

    getProductInfo: (id) => get().order.find((item) => item.id === id),

    disableIncrease: (id) => {
        const product = get().getProductInfo(id);
        return product ? product.quantity >= get().MAX_QUANTITY : false;
    },

    disableDecrease: (id) => {
        const product = get().getProductInfo(id);
        return product ? product.quantity <= get().MIN_QUANTITY : false;
    }
}));