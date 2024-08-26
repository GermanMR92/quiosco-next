"use server"

import { prisma } from "@/src/lib/prisma";

export async function getProductById(is_active: boolean = true, id: number) {


    const products = await prisma.product.findUnique(
        {
            where: { 
                is_active: is_active,
                id: id
            },
            include: {
                category: true
            }
        }
    );

    return products;
}