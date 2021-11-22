import React from "React";
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

    let paceStart = undefined;
    let paceEnd = undefined;

    if (today > end) {
        [paceStart, paceEnd ] = [end.plus({days:1}), today];
    } else {
        paceStart = today > start ? today : start;
        paceEnd = end.plus({days: 1});
    }

    let interval = Interval.fromDateTimes(paceStart, end.plus({days:1}))
    let days = Math.floor(interval.length('days').valueOf());
    
    let invalidPace = (read == total) ? "\u{1F389}" : "\u{1F622}"
    let pace = days > 0 ? ((total - read) / days).toFixed(1) : invalidPace;

    return (
        <div className="statsContainer">
            <Stat name="Issues Read" value={read} />
            <Stat name="Issues Remaining" value={total - read} />
            <Stat name="Days Remaining" value={days} />
            <Stat name="Daily Pace Needed" value={pace} />
        </div>
    )
}

export default Stats;