'use client'

import { useStore } from "@/src/store"
import { toast } from "react-toastify"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"

export default function OrderSummary() {

  const order = useStore((state) => state.order)
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
  const clearOrder = useStore((state) => state.clearOrder)

  const handleCreateOrder = async (formData: FormData) => {

    const data = {
      name: formData.get('name'),
      total,
      order
    }

    const result = OrderSchema.safeParse(data)
    
    // TODO: Meter los mensajes de error en un solo toas, actualmente sale un toast por cada error
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }

    const response = await createOrder(data)

    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message)
      })
    }

    toast.success('Pedido creado correctamente');
    clearOrder();
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10">No hay productos en tu pedido</p>
      ) : (
        <div className="mt-5">
          {order.map(item => (
            <ProductDetails key={item.id} item={item} />
          ))}

          <div className="rounded text-lg mt-2 flex justify-between p-4 bg-white border border-gray-200 shadow">
            <p>Total: {''}</p>
            <span className="font-bold">{formatCurrency(total)}</span>
          </div>


          <form className="w-full mt-2 space-y-5" action={handleCreateOrder}>

            <input
              type="text"
              placeholder="Nombre"
              className="p-2 rounded bg-white border border-gray-100 w-full"
              name="name"
            />

            <input className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
              type="submit"
              value='Confirmar pedido'
            />

          </form>

        </div>
      )}
    </aside>
  )
}
