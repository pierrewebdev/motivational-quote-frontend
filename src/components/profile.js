import React from "react";
import { NavLink,Link } from "react-router-dom";
import { Card } from "semantic-ui-react";



export default class Profile extends React.Component {
  render() {
    const pTagStyle = {
      fontSize: "20px",
    };
    const profileComponent = (
      <div style={{ margin: "20px" }}>
        <p style={{ fontSize: "25px" }}>Name: {this.props.name}</p>
        <p style={pTagStyle}>
         Age: {this.props.age} years old
        </p>
        <Link to="/edit-user-profile">
          <button className = "ui button">Edit User Profile</button>
        </Link>
      </div>
    );

    const logInFirst = (
      <div>
        <p>
          Sorry you can't view this page until you log in or create an account
        </p>
        <p>
          But as soon as you do we can give you all the motivation you need!
        </p>
        <br />
        <NavLink to="/login">
          <button>Log in here</button>
        </NavLink>
      </div>
    );
    return this.props.currentUser.id ? profileComponent : logInFirst;
  }
}
