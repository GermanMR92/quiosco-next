"use server"

import { OrderSchema } from "@/src/schema"

export async function createOrder(data: unknown) {

    const result = OrderSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        console.log('data', data);

    } catch (error) {
        console.log('error', error);

    }

}