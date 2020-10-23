import React from "react";
import { NavLink,Link } from "react-router-dom";

export default class Profile extends React.Component {
  render() {
    const pTagStyle = {
      fontSize: "20px",
    };
    const profileComponent = (
      <div style={{ margin: "20px" }}>
        <p style={{ fontSize: "25px" }}>Hello!!!</p>
        <p style={pTagStyle}>
          My name is {this.props.name}, I am {this.props.age} years old
        </p>
        <p style={pTagStyle}>And I am ready to be motivated</p>
        <Link to="/edit-user-profile">
          <button>Edit User Profile</button>
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
