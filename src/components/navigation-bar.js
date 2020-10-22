import React from "react";
import { Link } from "react-router-dom";

export default class Nav extends React.Component{
  render() {
      const ulStyles = {
        display:"flex",
        justifyContent:"space-around"
      }

      const liStyles = {
          listStyleType:"none"
      }
    return (
      <nav>
        <ul style = {ulStyles}>
          <li style = {liStyles}> <Link to = "/home">Motivate Me</Link></li>
          <li style = {liStyles}> <Link to = "/quote-generator">Quotes</Link></li>
          <li style = {liStyles}> <Link to = "/favorites">Favorites</Link></li>
          <li style = {liStyles}> <Link to = "/profile">My Profile</Link></li>
        </ul>
      </nav>
    );
  }
}
