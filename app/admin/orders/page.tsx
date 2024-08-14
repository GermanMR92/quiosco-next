import { getPendingOrders } from "@/actions/get-pending-orders-action";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";

export default async function OrdersPage() {

  const orders = await getPendingOrders();

  return (
    <>
      <Heading>Administrar pedidos</Heading>

      {orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {orders.map(order => (
            <OrderCard 
              key={order.id}
              order={order} 
            />
          ))}
        </div>
      ) : <p className="text-center">No hay pedidos pendientes</p>}
    </>
  )
}
