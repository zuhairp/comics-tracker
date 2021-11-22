import React from "react";
import { ResponsiveContainer, Tooltip, CartesianGrid, LineChart, XAxis, YAxis, Line } from "recharts";
import {DateTime, Interval} from "luxon"

interface ProgressPoint {
    count: number;
    time: number;
}

interface DataPoint {
    time: number;
    target: number;
    actual?: number;
}

interface ProgressChartProps {
    start: DateTime;
    end: DateTime;
    total: number;
    progress: ProgressPoint[];
}

const ProgressChart = ({start, end, total, progress}: ProgressChartProps) => {
    let interval = Interval.fromDateTimes(start, end);

    let pace = total / (interval.length('days'));

    let data: DataPoint[] = []
    let progressIndex = -1;
    let i = 0;
    let today = DateTime.now();
    for (let d = interval.start; d < interval.end; d = d.plus({days: 1}))
    {
        const time = d.valueOf();
        if (progress[progressIndex + 1] && time >= progress[progressIndex + 1].time) {
            progressIndex += 1;
        }
        data.push({
            time,
            target: Math.round(pace * (i+1)),
            actual: d <= today? 
                        progressIndex == -1 ? 0 : progress[progressIndex].count
                        : null
        })

        i++;
    }

    const tickFormatter = time => {
        const date = new Date(time)
        const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = shortMonths[date.getUTCMonth()]
        const day = date.getUTCDate()
        return `${month} ${day}`
    }

    return (
        <ResponsiveContainer width="100%" aspect={2} maxHeight={400}>
            <LineChart data={data} margin={{top: 20, right: 50, left: 20, bottom:20}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="time"
                    tickFormatter = {tickFormatter} />
                <YAxis label={{value:"Total # of Issues Read", angle: -90, position: 'insideLeft', style:{fill: 'gray', textAnchor: 'middle'}}}/>
                <Line 
                    dataKey="target" 
                    dot={false}
                    name="Target"
                    stroke="white"
                    strokeWidth={2}
                    strokeDasharray="9 9"/>
                <Line 
                    connectNulls
                    dataKey="actual" 
                    name="Progress"
                    dot={false}
                    stroke="#95ff75"
                    strokeWidth={2}
                    />
                <Tooltip 
                 labelFormatter = {tickFormatter}
                 contentStyle = {{
                     backgroundColor: "black"
                 }}
                 />
            </LineChart>
        </ResponsiveContainer>
    )

}

export default ProgressChart