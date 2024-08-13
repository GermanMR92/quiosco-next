import { Order, OrderProducts, Product } from "@prisma/client";

// export type of product with a selection of properties from the Product and some news
export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
    quantity: number;
    subtotal: number;
};

// export type of order with a selection of properties from the Order and some news
export type OrderWithProducts = Order & {
    orderProducts: (OrderProducts & {
        product: Product;
    })[] // <-- array of OrderProducts with the product included
}