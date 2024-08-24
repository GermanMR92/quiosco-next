
"use client";

import { SearchSchema } from "@/src/schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProductSearchForm() {

  const router = useRouter();
  
  const handleSearchForm = (formData: FormData) => {

    const data = {
      search: formData.get('search')
    }

    // validate data
    const result = SearchSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach(issue => {
        toast.error(issue.message);
      })
      return
    }

    // redirect to the new URL based on the search term
    if (result.data.search === '') {
      router.push(`/admin/products?page=1`) // TODO: todas las rutas ponerlas en un archivo con constantes
    } else {
      router.push(`/admin/products?page=1&search=${result.data.search}`) // TODO: todas las rutas ponerlas en un archivo con constantes
    }
  }

  return (
    <form
      className="flex items-center"
      action={handleSearchForm}
    >
      <input
        type="text"
        placeholder="Buscar producto"
        className="p-2 placeholder-gray-400 w-full"
        name="search"
      />
      <button
        type="submit"
        value={'Buscar'}
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
      >
        Buscar
      </button>
    </form>
  )
}
