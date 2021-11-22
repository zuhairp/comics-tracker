import React from "react"
import { Link } from "gatsby"

const SiteHeader = ({location}) => {
    return (
        <>
            <div id="header">
                <div id="siteTitle">Zuhair's Earth-616 Comic Progress</div>
                <div id="links">
                    <span className="link"><Link to="/2019">2019</Link></span>
                    <span className="link"><Link to="/2020">2020</Link></span>
                    <span className="link"><Link to="/2021">2021</Link></span>
                    <span className="link"><Link to="/2022">2022</Link></span>
                    <span className="link"><Link to="/2023">2023</Link></span>
                    <span className="link about"><Link to="/">About</Link></span>
                </div>
            </div>
        </>
    )
}

export default SiteHeader

