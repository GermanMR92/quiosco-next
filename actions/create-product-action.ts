"use server";

import { prisma } from "@/src/lib/prisma";
import { ProductFormSchema } from "@/src/schema";

export async function createProduct(data: unknown) {
    const result = ProductFormSchema.safeParse(data)

    if (!result.success) {
        console.log('error', result.error.issues);
        
        return {
            errors: result.error.issues
        }
    }

    await prisma.product.create({
        data: result.data
    })
}