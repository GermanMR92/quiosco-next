// This is a server component

import { getCategories } from "@/actions/get-categories-action";
import ImageUpload from "./ImageUpload";

export default async function ProductForm() {

    const categories = await getCategories();

    return (
        <>
            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="name"
                >Nombre:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="block w-full p-3 bg-slate-100 rounded"
                    placeholder="Nombre Producto"
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="price"
                >Precio:</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    className="block w-full p-3 bg-slate-100 rounded"
                    placeholder="Precio Producto"
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="categoryId"
                >Categoría:</label>
                <select
                    id="categoryId"
                    name="categoryId"
                    className="block w-full p-3 bg-slate-100 rounded"
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}

                </select>
            </div>

            <ImageUpload />
        </>
    )
}