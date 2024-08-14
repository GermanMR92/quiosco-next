"use server"

import { prisma } from "@/src/lib/prisma";

export async function getProducts(is_active: boolean = true, page: number) {

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const products = await prisma.product.findMany(
        {
            take: pageSize,
            skip: skip,
            where:
                { is_active: is_active },
            include: {
                category: true
            }
        }
    );

    return products;
}