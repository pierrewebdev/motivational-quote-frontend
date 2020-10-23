import React from "react"
import { Link } from "react-router-dom"
import "../stylesheets/sign_in_form.css"


export default class SignUp extends React.Component {
  state = {
    firstName:"",
   lastName:"",
    username:"",
    age:0,
    password:""
  }

  handleUserInput = (evt) =>{
    const inputName = evt.target.name
    console.log(inputName)
    this.setState({
      [inputName]:evt.target.value
    })
   }
 
   handleSubmit = (evt) =>{
     evt.preventDefault()
     //pass this info back up to the <App/> to make a post request
     this.props.registerUser(this.state)
   }

  render(){
    // console.log(this.state)
    return (
      <div className="form-wrapper">
        <h1>Sign Up</h1>
        <form onSubmit = {this.handleSubmit}>
        <div className="form-item">
            <label htmlFor="First Name"></label>
            <input
              type="text"
              name="firstName"
              required="required"
              placeholder="Enter First Name"
              value = {this.state.firstName}
              onChange = {this.handleUserInput}
            ></input>
          </div>
        <div className="form-item">
            <label htmlFor="Last Name"></label>
            <input
              type="text"
              name="lastName"
              required="required"
              placeholder="Enter Last Name"
              value = {this.state.lastName}
              onChange = {this.handleUserInput}
            ></input>
          </div>
          <div className="form-item">
            <label htmlFor="username"></label>
            <input
              type="text"
              name="username"
              required="required"
              placeholder="Enter Username"
              value = {this.state.username}
              onChange = {this.handleUserInput}
            ></input>
          </div>
          <div className="form-item">
            <label htmlFor="Age"></label>
            <input
              type="number"
              name="age"
              required="required"
              placeholder="Enter Age"
              value = {this.state.age}
              onChange = {this.handleUserInput}
            ></input>
          </div>
          <div className="form-item">
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              required="required"
              placeholder="Password"
              value = {this.state.password}
              onChange = {this.handleUserInput}
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
        <Link to = "/login">Sign in to an existing account</Link>
        </div>
      </div>
    );
  }
}
