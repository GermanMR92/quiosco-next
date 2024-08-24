"use server"

import { prisma } from "@/src/lib/prisma";

export async function getCategories(is_active: boolean = true) {

    const categories = await prisma.category.findMany(
        {
            where: { 
                is_active: is_active
            }
        }
    );

    return categories;
}