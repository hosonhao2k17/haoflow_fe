import { AccountStatus } from "@/common/constants/finance.constant";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";


const AccountFilterTab = () => {


    return (
        <Tabs defaultValue="all" className="mb-5">
            <TabsList className=" border-primary border-2">
                <TabsTrigger className="text-primary " value="all">
                            Tất cả
                        </TabsTrigger>
                {
                    Object.values(AccountStatus).map((item) => (
                        <TabsTrigger className="text-primary" value={item}>
                            {item}
                        </TabsTrigger>
                    ))
                }
            </TabsList>
        </Tabs>
    )
}

export default AccountFilterTab;