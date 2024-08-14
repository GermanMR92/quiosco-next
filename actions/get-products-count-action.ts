"use server"

import { prisma } from "@/src/lib/prisma";

export async function getProductsCount(is_active: boolean = true) {

    const products = await prisma.product.count(
        {
            where: { is_active: is_active }
        }
    );

    return products;
}