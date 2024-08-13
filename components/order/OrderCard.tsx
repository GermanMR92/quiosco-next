import { completeOrder } from "@/actions/complete-order-action";
import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";

type OrderCardProps = {
    order: OrderWithProducts;
}

export default function OrderCard({ order }: OrderCardProps) {

    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 space-y-4 flex flex-col justify-between h-full"
            style={{ minHeight: '300px' }}
        >
            <div>
                <p className='text-xl font-bold text-gray-900'>Cliente: {order.name}</p>
                <p className='text-base font-medium text-gray-900'>Productos:</p>
                <dl className="space-y-3">
                    {order.orderProducts.map(product => (
                        <div key={product.productId} className="flex items-center gap-2 border-t border-grey-200 pt-4">
                            <dt className="flex items-center text-sm text-gray-600">
                                <span className="font-black">({product.quantity}) {''}</span>
                            </dt>
                            <dd className="text-sm font-medium text-gray-600">{product.product.name}</dd>
                        </div>
                    ))}
                </dl>
            </div>
            <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">Total a Pagar:</dt>
                    <dd className="text-base font-medium text-gray-900">{formatCurrency(order.total)}</dd>
                </div>
                <form action={completeOrder}>
                    <input
                        type="hidden"
                        value={order.id} 
                        name="order_id"
                    />
                    <input
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-6 p-3 uppercase font-bold cursor-pointer rounded"
                        value='Completar pedido'
                    />
                </form>
            </div>
        </section>
    )
}
