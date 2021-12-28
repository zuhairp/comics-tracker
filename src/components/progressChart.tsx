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
    projected?: number;
}

interface ProgressChartProps {
    start: DateTime;
    end: DateTime;
    total: number;
    progress: ProgressPoint[];
}

const ProgressChart = ({start, end, total, progress}: ProgressChartProps) => {
    let interval = Interval.fromDateTimes(start, end.plus({days: 1}));

    let pace = total / (interval.length('days'));

    let data: DataPoint[] = []
    let progressIndex = -1;
    let i = 0;
    let today = DateTime.now().set({hour: 0, minute: 0});
    let yesterdaysProgress = 0;

    let actualPace = null;
    if (today >= start && today <= end) {
        const read = progress[progress.length - 1].count;
        const days = Math.round(today.diff(start, 'days').days);
        actualPace = read / (days + 1);
    }

    for (let d = interval.start; d < interval.end; d = d.plus({days: 1}))
    {
        const time = d.valueOf();
        if (progress[progressIndex + 1] && time >= progress[progressIndex + 1].time) {
            progressIndex += 1;
        }
        
        const todaysProgress = progressIndex >= 0 ? progress[progressIndex].count : 0;

        const done = todaysProgress >= total && yesterdaysProgress >= total;
        const projected = Math.round(actualPace * (i+1))
        
        data.push({
            time,
            target: Math.round(pace * (i+1)),
            actual: d <= today && !done? 
                        progressIndex == -1 ? 0 : progress[progressIndex].count
                        : null,
            projected: projected <= total ? projected : null
        })

        i++;
        yesterdaysProgress = todaysProgress;
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
                <YAxis 
                    label={{value:"Total # of Issues Read", angle: -90, position: 'insideLeft', style:{fill: 'gray', textAnchor: 'middle'}}}
                    type="number"
                    domain={[0, total]}/>
                <Line 
                    dataKey="target" 
                    dot={false}
                    name="Target"
                    stroke="white"
                    strokeWidth={2}
                    strokeDasharray="7 7"/>
                <Line 
                    dataKey="projected" 
                    dot={false}
                    name="Projected"
                    stroke="gray"
                    strokeWidth={2}
                    strokeDasharray="3 3"/>
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