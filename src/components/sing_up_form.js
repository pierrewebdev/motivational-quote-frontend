import React from "react"
import "../stylesheets/sign_in_form.css"

export default class SignUp extends React.Component {
  render(){
    return (
      <div className="form-wrapper">
        <h1>Sign Up</h1>
        <form>
        <div className="form-item">
            <label htmlFor="First Name"></label>
            <input
              type="text"
              name="First Name"
              required="required"
              placeholder="Enter First Name"
            ></input>
          </div>
        <div className="form-item">
            <label htmlFor="Last Name"></label>
            <input
              type="text"
              name="Last Name"
              required="required"
              placeholder="Enter Last Name"
            ></input>
          </div>
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
            <label htmlFor="Age"></label>
            <input
              type="number"
              name="Age"
              required="required"
              placeholder="Enter Age"
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
              title="Sign Up"
              value="Sign Up"
            ></input>
          </div>
        </form>
        <div className="form-footer">
        </div>
      </div>
    );
  }
}
