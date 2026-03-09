"use client"

import AlertRemoveDialog from "@/components/common/AlertRemoveDialog"
import CategoryTool from "@/features/task-category/components/CategoryTool"
import TaskCategoryCard from "@/features/task-category/components/TaskCategoryCard"
import TaskCategoryCreate from "@/features/task-category/components/TaskCategoryCreate"
import TaskCategoryUpdate from "@/features/task-category/components/TaskCategoryUpdate"
import { TaskCategory } from "@/features/task-category/interfaces/task-catgegory.interface"
import { useRemoveTaskCategory, useTaskCategories } from "@/features/task-category/task-category.hook"
import { useState } from "react"
import { toast } from "sonner"

const Category = () => {
  const [keyword, setKeyword] = useState<string>();
  const [limit, setLimit] = useState<number>(20);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openRemove, setOpenRemove] = useState<boolean>(false);
  
  const [category, setCategory] = useState<TaskCategory>();
  const { data } = useTaskCategories({
    keyword, 
    limit
  })

  const removeTaskCategory = useRemoveTaskCategory();

  const handleRemove = () => {
    removeTaskCategory.mutate(category?.id as string, {
      onSuccess: () => {
        toast.success("Xóa thành công")
      }
    })
  }


  return (
    <div className="flex flex-col gap-5 w-full">
      <CategoryTool 
        setKeyword={setKeyword}
        setLimit={setLimit}
        setOpenCreate={setOpenCreate}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {
          data?.items.map((category: TaskCategory) => (
            <TaskCategoryCard 
              key={category.id}
              setOpenUpdate={setOpenUpdate}
              category={category}
              setCategory={setCategory}
              setOpenRemove={setOpenRemove}
            />
          ))
        }
      </div>
      <TaskCategoryCreate 
        open={openCreate}
        setOpen={setOpenCreate}
      />
      <TaskCategoryUpdate 
        taskCategory={category}
        open={openUpdate}
        setOpen={setOpenUpdate}
      />
      <AlertRemoveDialog 
        openConfirm={openRemove}
        setOpenConfirm={setOpenRemove}
        title={category?.title as string}
        handleRemove={handleRemove}
      />
    </div>
  )
}

export default Category