"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Category } from "@prisma/client"

// Define the props of this component
type CategoryIconProps = {
    category: Category,
}

export default function CategoryIcon({ category }: CategoryIconProps) {

    const params = useParams() // get the params (category) from the URL

    return (
        <Link href={`/order/${category.slug}`}>
            <div className={`${category.slug == params.category ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}>
                <div className="w-16 h-16 relative">
                    <Image
                        fill // occupies the available width of the first relative parent
                        src={`/icon_${category.slug}.svg`}
                        alt="Image category"
                    />
                </div>

                <p className="text-xl font-bold">
                    {category.name}
                </p>
            </div>
        </Link>
    )
}
