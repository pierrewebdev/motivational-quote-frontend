import React from "react";
import "./App.css";
import Home from "./components/home_page";
import Header from "./components/header";
import SignIn from "./components/sign_in_form";
import SignUp from "./components/sing_up_form";
import QuoteContainer from "./components/quote-container";
import NotFound from "./components/not_found.js";

//routes
//The switch component is like a switch statement in js
//it will rnder the component that matches the url path or will render NotFound if nothing matches
//The Link component functions as an <a></a>
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  state = {
    quotes:[],
    currentUser:{}
  }


  componentDidMount(){
    //fetch request to get quotes
    fetch("http://localhost:3000/quotes")
    .then(res => res.json())
    .then(quotesObject => {
      this.setState({
        quotes:[...quotesObject.quotes]
      })
    })
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
      this.setState({
        currentUser:{...userInfo}
      })
    })
  }
  render() {
    console.log(this.state)
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact>
            <SignIn logInUser = {this.logInUser}/>
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/signup" exact>
            <SignUp />
          </Route>

          <Route path="/quote-generator" exact>
            <QuoteContainer quotes = {this.state.quotes}/>
          </Route>

          <Route>
            {/*This route will only be selected when the user requests a page that doesn't exist*/}
            <NotFound />
          </Route>
        </Switch>
        {/* <Home/> */}
        {/* <SignIn/> */}
        {/* <SignUp/> */}
      </div>
    );
  }
}

export default App;
