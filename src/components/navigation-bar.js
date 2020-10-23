import React from "react";
import { NavLink } from "react-router-dom";

export default class Nav extends React.Component{
  handleClick = () =>{
    this.props.logOut()
  }

  render() {
      const ulStyles = {
        display:"flex",
        justifyContent:"space-between"
      }

      const liStyles = {
          listStyleType:"none"
      }

      const siteName = {
        listStyleType:"none",
        fontFamily: "Alegreya",
        fontSize:"25px",
        float:"left"
      }

      const linkStyles = {
        color:"#f7f7f7",
        display:"flex",
      }

      const logOutstyles = {
        backgroundColor:"#444053",
        color:"#f7f7f7",
        padding:"0px",
        border:"none"
      }
    return (
      <nav>
        <ul style = {ulStyles}>
          <li style = {siteName}> <NavLink style = {linkStyles}to = "/">Motivate Me</NavLink></li>
          <li style = {liStyles}> <NavLink style = {linkStyles} to = "/quote-generator">Quotes</NavLink></li>
          <li style = {liStyles}> <NavLink style = {linkStyles} to = "/favorites">Favorites</NavLink></li>
          <li style = {liStyles}> <NavLink style = {linkStyles} to = "/profile">My Profile</NavLink></li>
          <li style = {liStyles}><button style = {logOutstyles} onClick= {this.handleClick}> Log Out</button></li>
        </ul>
      </nav>
    );
  }
}
