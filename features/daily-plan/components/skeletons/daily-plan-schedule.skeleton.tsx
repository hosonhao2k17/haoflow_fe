import { Skeleton } from "@/components/ui/skeleton"


const DailyPlanScheduleSkeleton = () => {
    

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {
                Array.from({length: 7}).map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl hover:shadow-2xl hover:shadow-primary border shadow-lg flex flex-col gap-2 transition-all p-5 ">
                        <Skeleton className="w-10 h-3"/>
                        <Skeleton className="w-25 h-5"/>
                        <Skeleton className="w-50 h-3"/>
                        <Skeleton className="w-30 h-3"/>
                        <Skeleton className="w-full h-2"/>
                        <Skeleton className="w-full h-30"/>
                    </div>
                ))
            }
        </div>
    )
}


export default DailyPlanScheduleSkeleton