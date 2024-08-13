import { z } from 'zod';

export const OrderSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido'),
  total: z
    .number()
    .min(1, 'Error en el pedido'),
  order: z
    .array(z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      subtotal: z.number()
    }))
});

export const OrderIdSchema = z.object({
  order_id: z
    .string() // <-- string because it comes from FormData
    .transform(value => parseInt(value)) // <-- transform to number
    .refine(value => !isNaN(value), {message: 'El id del pedido es requerido'}) // <-- check if it's a number
});