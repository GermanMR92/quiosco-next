"use server"

import { prisma } from "@/src/lib/prisma";

export async function getPendingOrders() {

    const orders = await prisma.order.findMany({
        where: {
            status: false
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    });

    return orders;

}