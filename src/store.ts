import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order: OrderItem[];
    addToOrder: (product: Product) => void;
}

/**
 * Represents the store state.
 */
export const useStore = create<Store>((set, get) => ({
    order: [],

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
}));