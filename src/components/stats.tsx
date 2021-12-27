import React from "react";
import {DateTime, Interval} from "luxon"

interface StatsProps {
    start: DateTime;
    end: DateTime;
    total: number;
    read: number;
}

const Stat = ({name, value}) => {
    return (
        <div className="singleStatContainer">
            <div className="singleStatValue">{ value }</div>
            <div className="singleStatName">{ name }</div>
        </div>
    )
}

const Stats = ({start, end, total, read}: StatsProps) => {
    const today = DateTime.now().set({hour: 0, minute: 0})

    let daysRemaining = Math.round(end.diff(today, 'days').days);
    let daysIn = Math.round(today.diff(start, 'days').days);
    let totalDays = Math.round(end.diff(start, 'days').days)+1;

    let target = undefined;
    let projected = null;

    if (daysIn < 0) {
        target = "-"
        daysRemaining = Math.round(end.diff(start, 'days').days)
    } 
    else if (daysRemaining < 0) {
        target = (read >= total) ? "\u{1F389}" : "\u{1F622}";
        daysRemaining = 0;
    }
    else {
        const avg = total / totalDays;
        target = read < total ? Math.round((daysIn+1) * avg) : "\u{1F389}";
        
        if (read < total) {
            const actualPace = read / (daysIn+1);
            const completionDays = Math.floor(total / actualPace);
            const completionDate = start.plus({days: completionDays});
            const date = completionDate.toFormat('LLLL dd');

            projected = (<Stat name="Projected Completion" value={date}/>)
        }
    }

    if (read >= total) {
        projected = null;
    }

    return (
        <div className="statsContainer">
            <Stat name="Issues Read" value={read} />
            <Stat name="Issues Remaining" value={total - read} />
            <Stat name="Today's Target" value={target} />
            <Stat name="Days Remaining" value={daysRemaining} />
            { projected }
        </div>
    )
}

export default Stats;