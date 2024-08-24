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
    .refine(value => !isNaN(value), { message: 'El id del pedido es requerido' }) // <-- check if it's a number
});

export const SearchSchema = z.object({
  search: z
    .string()
    .trim()
});

export const ProductFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'El nombre es requerido' }),

  price: z
    .string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: 'Precio no válido' }),

  categoryId: z
    .string()
    .trim()
    .transform((value) => parseInt(value))
    .refine(value => !isNaN(value), { message: 'La categoría es requerida' })
    .or(z.number().min(1, { message: 'La categoría es requerida' })),
});