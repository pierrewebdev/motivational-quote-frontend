import React from 'react';
import Nav from "./navigation-bar.js"

const headerStyles = {
    backgroundColor:"whitesmoke",
    padding:"20px",
    color:"black"
}

export default function Header(){
    return (
    <header style = {headerStyles}>
         <Nav/>
    </header>
    )
}