"use server"

import { prisma } from "@/src/lib/prisma";

export async function getProductsCount(is_active: boolean = true, searchTerm?: string) {

    const products = await prisma.product.count(
        {
            where: { 
                is_active: is_active ,
                ...(searchTerm && {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive' // case insensitive
                    }
                })

            }
        }
    );

    return products;
}