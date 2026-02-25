import { Skeleton } from "@/components/ui/skeleton"



const TaskListSkeleton = () => {


    return (
        <div className="grid grid-cols-2 gap-5 items-start">
            {
                Array.from({length: 10}).map((item, i) => (
                    <div key={i} className="flex gap-3 border shadow-xl p-3 h-28 rounded-xl">
                        <Skeleton className="w-18 h-full"/>
                        <div className="flex flex-col gap-3 w-full">
                            <Skeleton className="bg-primary w-60 h-5"/>
                            <Skeleton className="bg-primary w-80 h-4"/>
                            <Skeleton className="bg-primary w-full h-3"/>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TaskListSkeleton 