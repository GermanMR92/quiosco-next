
export default function ProductSearchForm() {
  return (
    <form className="flex items-center">
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
