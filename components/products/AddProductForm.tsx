"use client";

import { ProductFormSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function AddProductForm({ children }: { children: React.ReactNode }) {

    const handleSubmit = async (formData: FormData) => {

        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId')
        }

        const result = ProductFormSchema.safeParse(data);
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message);
            })
            return
        }
        
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form
                action={handleSubmit}
                className="space-y-5"
            >

                {/* We use composition to add the ProductForm component to the AddProductForm component. */}
                {/* because ProductForm is a server component and AddProductForm is a client component */}
                {children} 

                <input
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded"
                    type="submit"
                    value="Registrar producto"
                />
            </form>
        </div>
    )
}
