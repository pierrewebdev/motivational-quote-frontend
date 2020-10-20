import React from "react";
import "../stylesheets/sign_in_form.css"
import { Link } from "react-router-dom";

export default class SignIn extends React.Component {
  render() {
    return (
      <div className="form-wrapper">
        <h1>Sign In</h1>
        <form>
          <div className="form-item">
            <label htmlFor="username"></label>
            <input
              type="text"
              name="username"
              required="required"
              placeholder="Enter Username"
            ></input>
          </div>
          <div className="form-item">
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              required="required"
              placeholder="Password"
            ></input>
          </div>
          <div className="button-panel">
            <input
              type="submit"
              className="button"
              title="Sign In"
              value="Sign In"
            ></input>
          </div>
        </form>
        <div className="form-footer">
          <p>
            <Link to = "/signup">Create an account</Link>
          </p>
        </div>
      </div>
    );
  }
}
