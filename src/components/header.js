import React from 'react';
import Nav from "./navigation-bar.js"

const headerStyles = {
    backgroundColor:"#444053",
    padding:"20px",
}

export default function Header(props){
    return (
    <header style = {headerStyles}>
         <Nav logOut = {props.logOut} />
    </header>
    )
}