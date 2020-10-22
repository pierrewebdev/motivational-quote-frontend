import React from "react";
import { Link } from "react-router-dom";

export default class Profile extends React.Component {
  render() {
      const pTagStyle = {
          fontSize:"20px"
      }
    return (
      <div style = {{margin:"20px"}}>
        <p style = {{fontSize:"25px"}}>Hello!!!</p>
        <p style = {pTagStyle}>
          My name is {this.props.name}, I am {this.props.age} years old
        </p>
        <p style = {pTagStyle}>And I am ready to be motivated</p>
        <Link to = "/edit-user-profile"><button>Edit User Profile</button></Link>
      </div>
    );
  }
}
