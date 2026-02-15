
import { Pie, Tooltip, PieChart } from "recharts"


const UsersPieChart = () => {


    return (
        <PieChart width={150} height={150}>
            <Pie
                 activeShape={{
          fill: 'red',
        }}
        data={[
          { name: 'Page A', uv: 590 },
          { name: 'Page B', uv: 590 },
          { name: 'Page C', uv: 868 },
        ]}
        dataKey="uv"
        isAnimationActive={true}
            />
            <Tooltip defaultIndex={2}/>
        </PieChart>
    )
}

export default UsersPieChart