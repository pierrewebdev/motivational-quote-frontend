import React from "react";
import "./App.css";
import Home from "./components/home_page";
import Header from "./components/header";
import SignIn from "./components/sign_in_form";
import SignUp from "./components/sing_up_form";
import Quote from "./components/quote";
import NotFound from "./components/not_found.js";

//routes
//The switch component is like a switch statement in js
//it will rnder the component that matches the url path or will render NotFound if nothing matches
//The Link component functions as an <a></a>
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  state = {
    quotes:[]
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
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact>
            <SignIn />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/signup" exact>
            <SignUp />
          </Route>

          <Route path="/quote-generator" exact>
            <Quote quotes = {this.state.quotes}/>
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
