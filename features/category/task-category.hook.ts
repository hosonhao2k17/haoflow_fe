import { useQuery } from "@tanstack/react-query";
import { QueryTaskCategory } from "./interfaces/query-task-category.interface";
import { getTaskCategories } from "./category.api";


export const useTaskCategories = (query: QueryTaskCategory) => {

    return useQuery({
        queryKey: ["taskCategories", query],
        queryFn: () => getTaskCategories(query)
    })
}
