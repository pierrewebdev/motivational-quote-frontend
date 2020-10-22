import React from "react";
import "./App.css";
import Home from "./components/home_page";
import Header from "./components/header";
import SignIn from "./components/sign_in_form";
import SignUp from "./components/sing_up_form";
import QuoteContainer from "./components/quote-container";
import MyQuote from "./components/my-quote-container"
import Profile from "./components/profile.js"
import ProfileForm from "./components/profile-form.js"
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
          "Authorization": localStorage.token
        }
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
          this.setState(niceState)
          this.props.history.push("/home")
        }
      })
    }
  }

 //==================================================================//
 //user login and registration 

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
 //==================================================================//

 //CRUD methods
 //method to add a new quote; needs to make use of the auth token in the headers
 addNewQuote = (quoteObj) => {
   fetch("http://localHost:3000/quotes",{
    method:"POST",
    headers: {
        "Content-Type":"application/json",
        "authorization": this.state.token
    },
    body: JSON.stringify({
      content: quoteObj.quoteText,
      author: quoteObj.author
    })
   })
   .then(res => res.json())
   .then(newQuoteObj => {
     debugger
     //need to add it into the state of quotes non-destructively
     const updatedUserQuotes = [...this.state.quotes,newQuoteObj.quote]
     const updatedAllQuotes = [...this.state.allQuotes,newQuoteObj.quote]

     this.setState({
       quotes:updatedUserQuotes,
       allQuotes: updatedAllQuotes
     })
   })
 }

//creating one method that will allow me to delete from both favorites and quotes
 deleteQuote = (quoteId) =>{
  fetch(`http://localhost:3000/quotes/${quoteId}`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json",
      "authorization": this.state.token
    }
  })
  .then(res => res.json())
  .then(deletedQuoteObj => {
    //update the arrays allQuotes and quotes in the state
    const filteredUserQuotes = this.state.quotes.filter( quote => quote.id!== deletedQuoteObj.quote.id)
    const filteredAllQuotes = this.state.allQuotes.filter(quote => quote.id!== deletedQuoteObj.quote.id)

    this.setState({
      quotes:filteredUserQuotes,
      allQuotes: filteredAllQuotes
    })
  })
}

  handleProfileEdit = (userObj) => {
    //update info in backend
    fetch(`http://localhost:3000/users/${this.state.id}`,{
      method:"PATCH",
      headers: {
        "Content-Type":"application/json",
        "authorization": this.state.token
      },
      body: JSON.stringify({...userObj})
    })
    .then(res => res.json())
    .then(updatedUserObj =>{
      this.setState({...updatedUserObj.user})
    })
  }


  render() {
    console.log(this.state.full_name)
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
            <MyQuote deleteQuote = {this.deleteQuote} addNewQuote = {this.addNewQuote} quotes = {this.state.quotes}/>
          </Route>

          <Route path="/profile" exact>
            <Profile name = {this.state.full_name} age = {this.state.age}/>
          </Route>

          <Route path="/edit-user-profile" exact>
            <ProfileForm editProfile = {this.handleProfileEdit}  />
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
