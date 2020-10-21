import React from "react";
import "./App.css";
import Home from "./components/home_page";
import Header from "./components/header";
import SignIn from "./components/sign_in_form";
import SignUp from "./components/sing_up_form";
import QuoteContainer from "./components/quote-container";
import MyQuote from "./components/my-quote-container"
import NotFound from "./components/not_found.js";

//routes
//The switch component is like a switch statement in js
//it will rnder the component that matches the url path or will render NotFound if nothing matches
//The Link component functions as an <a></a>
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

class App extends React.Component {
  state = {
    allQuotes:[],
    id:0,
    full_name: "",
    age:0,
    quotes:[],
    favorites:[],
    token:"",
    errorMessage:""
  }


  componentDidMount(){
    //fetch request to get quotes
    fetch("http://localhost:3000/quotes")
    .then(res => res.json())
    .then(quotesObject => {
      this.setState({
        allQuotes:[...quotesObject.quotes]
      })
    })

    //fetch request made if a user has logged recently and have a token stored in localStorage

    if (localStorage.token){
      fetch("http://localhost:3000/users/keep_logged_in",{
        method:"GET",
        headers:{
          "Auhtorization": localStorage.token
        }
      })
      .then(res => console.log(res))
    }
  }

  //method to log in user after they have submitted sign in form
  logInUser = (formData) => {
    const {username,password} = formData
    fetch("http://localhost:3000/login",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        Accept:"application/json"
      },
      body:JSON.stringify({
        username:username,
        password:password
      })
    })
    .then(res => res.json())
    .then(userInfo => {
      if(userInfo.error_message){
        this.setState({
          errorMessage: userInfo.error_message
        })
      }
      else{
        //happens when a user has successfully logged in
        localStorage.token = userInfo.token
        let niceState = {...userInfo.user.user,token:userInfo.token}
        console.log(niceState)
        this.setState(niceState)
        this.props.history.push("/home")
      }
    })
  }


  //method to allow user to sign up for an account
  registerUser = (formData) => {
    const {firstName, lastName, username, age, password} = formData
    console.log(formData)
    fetch("http://localhost:3000/users",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        Accept:"application/json"
      },
      body:JSON.stringify({
        firstName:firstName,
        lastName:lastName,
        username:username,
        age:age,
        password:password
      })
    })
    .then(res => res.json())
    .then(newUserInfo => {
      if(newUserInfo.error_message){
        this.setState({
          errorMessage: newUserInfo.error_message
        })
      }
      else{
        //happens when a user has successfully logged in
        localStorage.token = newUserInfo.token
        let niceState = {...newUserInfo.user.user,token:newUserInfo.token}
        console.log(niceState)
        this.setState(niceState)
        this.props.history.push("/home")
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
    {this.state.errorMessage ? <p style = {{fontWeight:"bold"}}>{this.state.errorMessage}</p> : null}
        <Switch>
          <Route path="/" exact>
            <SignIn logInUser = {this.logInUser}/>
          </Route>

          <Route path="/home">
            <Home currentUser = {this.state} history = {this.props.history}/>
          </Route>

          <Route path="/signup" exact>
            <SignUp registerUser = {this.registerUser} />
          </Route>

          <Route path="/quote-generator" exact>
            <QuoteContainer currentUser = {this.state} quotes = {this.state.allQuotes}/>
          </Route>

          <Route path = "/my-quotes" exact>
            <MyQuote quotes = {this.state.quotes}/>
          </Route>

          <Route>
            {/*This route will only be selected when the user requests a page that doesn't exist*/}
            <NotFound />
          </Route>
        </Switch>
      </div>
    );
  }
}

const withRouterComponent = withRouter(App)
export default withRouterComponent;
