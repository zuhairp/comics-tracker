import React from "react";
import { graphql } from "gatsby";
import { DateTime, DateTimeFormatOptions } from "luxon"

import Layout from "../components/layout"
import ProgressChart from "../components/progressChart";
import Stats from "../components/stats";

const formatDateLong = (dateString: string) => {
    const date = new Date(dateString)
    const longMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const month = longMonths[date.getUTCMonth()]
    const day = date.getUTCDate()
    const year = date.getUTCFullYear();
    
    return `${month} ${day}, ${year}`
}

const YearTemplate = ({ data, location }) => {
    const pageData = data.dataYaml
    const { title, start, end, year, total, progress, note } = pageData

    let startTime = DateTime.fromISO(start).setZone("America/Los_Angeles").plus({hours: 8})
    let endTime = DateTime.fromISO(end).setZone("America/Los_Angeles").plus({hours: 8})


    let format: DateTimeFormatOptions = {month: "short", day: "numeric", year: "numeric"}

    let progressData = progress.map(p => {
        return {
            time: DateTime.fromISO(p.date).setZone("America/Los_Angeles").plus({hours: 8}).valueOf(),
            count: p.count,
        }
    })

    const read = progress.length > 0 ? progress[progress.length-1].count : 0;

    return (
        <Layout location={location}>
            <div id="content">
                <div id="title">{ title }</div>
                <div id="readingPeriod">
                    <span id="text">Reading period: </span>
                    <span id="time">{ startTime.toLocaleString(format) } to {endTime.toLocaleString(format)}</span>
                </div>
                <div id="chart">
                    <ProgressChart start={startTime} end={endTime} total={total} progress={progressData}/>
                </div>
                <div id="note">
                    {note}
                </div>
                <div id="stats">
                    <Stats start={startTime} end={endTime} total={total} read={read} /> 
                </div>
            </div>
        </Layout>
    )
}

export default YearTemplate

export const pageQuery = graphql`
    query DataForYear($year: Int) {
    dataYaml (year: {eq: $year}){
        start
        end
        title
        year
        total
        note
        progress {
            date
            count
        }
    }
    }
`