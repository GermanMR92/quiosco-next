import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

// We define the store interface with the variables and functions that we will use
interface Store {
    order: OrderItem[];
    addToOrder: (product: Product) => void;
    increaseQuantity: (id: Product['id']) => void;
    decreaseQuantity: (id: Product['id']) => void;
    getProductInfo: (id: Product['id']) => OrderItem | undefined;
    disableIncrease: (id: Product['id']) => boolean;
    disableDecrease: (id: Product['id']) => boolean;
    MAX_QUANTITY: number;
    MIN_QUANTITY: number;
}

/**
 * Represents the store state.
 */
export const useStore = create<Store>((set, get) => ({
    order: [],
    MAX_QUANTITY: 5, // Maximum quantity of a product
    MIN_QUANTITY: 1, // Minimum quantity of a product

    /**
     * Adds a product to the order.
     * @param product - The product to be added.
     */
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
    increaseQuantity: (id) => { // Increase the quantity of a product in the order

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
    decreaseQuantity: (id) => { // Decrease the quantity of a product in the order

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
    getProductInfo: (id) => get().order.find((item) => item.id === id), // Get the product information

    disableIncrease: (id) => { // control that the quantity is not greater than MAX_QUANTITY
        const product = get().getProductInfo(id);
        return product ? product.quantity >= get().MAX_QUANTITY : false;
    },

    disableDecrease: (id) => { // control that the quantity is not less than MIN_QUANTITY
        const product = get().getProductInfo(id);
        return product ? product.quantity <= get().MIN_QUANTITY : false;
    }
}));