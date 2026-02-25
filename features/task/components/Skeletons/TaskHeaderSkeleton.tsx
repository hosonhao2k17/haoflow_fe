import { Skeleton } from "@/components/ui/skeleton"




const TaskHeaderSkeleton = () => {


    return (
        <div className="flex border flex-col gap-2 rounded-2xl h-40 p-5  bg-white">
            <Skeleton className="w-100 h-8"/>
            <Skeleton className="w-150 h-5"/>
            <Skeleton className="w-100 h-3"/>
            <Skeleton className="w-50 h-3"/>
            <Skeleton className="w-full h-2"/>
        </div>
    )

}

export default TaskHeaderSkeleton 