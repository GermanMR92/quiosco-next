import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order: OrderItem[];
    addToOrder: (product: Product) => void;
}

export const useStore = create<Store>((set) => ({ // We ned set to modify the state
    order: [],
    addToOrder: (product) => {

        // We extract unnecessary values
        const { categoryId, image, description, is_active, ...data } = product;

        // We modify the state with the new product
        set((state) => ({
            order: [...state.order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }));
    }
}));