import { Product } from "@prisma/client";

// export type of product with a selection of properties from the Product and some news
export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
    quantity: number;
    subtotal: number;
};