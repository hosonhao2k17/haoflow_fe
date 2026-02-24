"use client"

import CategoryList from "@/features/category/components/CategoryList"
import { useTaskCategories } from "@/features/category/task-category.hook"



const Category = () => {

    const {data} = useTaskCategories({})

    return (
        <div className="flex w-full">
            <CategoryList 
                items={data?.items}
            />
        </div>
    )
}

export default Category 