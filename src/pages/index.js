import React from "react";
import Layout from "../components/layout";

const Index = ({data, location}) => {
    return (
        <Layout location={location} title="Home">
            <div id="explanation">
                Welcome to my comics tracker! <br />
                Click a year above to see how much I read or plan to read, in that year! <br />
                I am following the <a href="https://www.comicbookherald.com/the-complete-marvel-reading-order-guide/">Comic Book Herald Complete Marvel Reading Order</a>
            </div>
        </Layout>
    )
}

export default Index;