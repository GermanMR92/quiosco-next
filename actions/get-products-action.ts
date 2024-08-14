"use server"

import { prisma } from "@/src/lib/prisma";

export async function getProducts(is_active: boolean = true) {

    const products = await prisma.product.findMany(
        {
            where:
                { is_active: is_active },
            include: {
                category: true
            }
        }
    );

    return products;
}