import React from "react"
import SiteHeader from "../components/navigation"
import "../style.css"

const Layout = ({location, children}) => {
    return (
        <div>
            <SiteHeader location={location}/>
            { children }
        </div>
    )    
}

export default Layout