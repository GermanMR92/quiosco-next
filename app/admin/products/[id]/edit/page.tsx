import { getProductById } from "@/actions/get-product-action"
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {

    const product = await getProductById(true, parseInt(params.id));

    // Import automatically the file not-found.tsx from this folder
    if (product === null) {
        notFound();
    }

    return (
        <div>EditProductPage</div>
    )
}
