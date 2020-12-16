import React from "react";
import 'semantic-ui-css/semantic.min.css'
import "./App.css";
import Home from "./components/home_page";
import Header from "./components/header";
import SignIn from "./components/sign_in_form";
import SignUp from "./components/sing_up_form";
import QuoteContainer from "./components/quote-container";
import MyQuoteContainer from "./components/my-quote-container";
import Profile from "./components/profile.js";
import Favorite from "./components/favorite-quote";
import ProfileForm from "./components/profile-form.js";
import QuoteUpdate from "./components/quote-update-form.js";
import NotFound from "./components/not_found.js";

//routes
//The switch component is like a switch statement in js
//it will rnder the component that matches the url path or will render NotFound if nothing matches
//The Link component functions as an <a></a>
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

//=============================================================================//

//Please note that when looking at any of the code involved in the second .then() of a fetch request, the data is nested a little deeper than what you would expect, so always console.log() the data you get back from a fetch request
//This happens because a strange bug in my backend serializers

class App extends React.Component {
  state = {
    allQuotes: [],
    id: 0,
    full_name: "",
    age: 0,
    quotes: [],
    favorites: [],
    token: "",
    errorMessage: ""
  };

  componentDidMount() {
    //fetch request to get quotes
    fetch("http://localhost:3000/quotes")
      .then((res) => res.json())
      .then((quotesObject) => {
        this.setState({
          allQuotes: [...quotesObject.quotes],
        });
      });

    //fetch request made if a user has logged recently and have a token stored in localStorage

    if (localStorage.token) {
      fetch("http://localhost:3000/users/keep_logged_in", {
        method: "GET",
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((userInfo) => {
          if (userInfo.error_message) {
            this.setState({
              errorMessage: userInfo.error_message,
            });
          } else {
            //happens when a user has successfully logged in
            localStorage.token = userInfo.token;
            let niceState = { ...userInfo.user.user, token: userInfo.token };
            this.setState(niceState);
            this.props.history.push("/");
          }
        });
    }
  }

  //==================================================================//
  //user login and registration

  //method to log in user after they have submitted sign in form
  logInUser = (formData) => {
    const { username, password } = formData;
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((userInfo) => {
        if (userInfo.error_message) {
          this.setState({
            errorMessage: userInfo.error_message,
          });
        } else {
          //happens when a user has successfully logged in
          localStorage.token = userInfo.token;
          let niceState = { ...userInfo.user.user, token: userInfo.token };
          this.setState(niceState);
          this.props.history.push("/");
        }
      });
  };

  //method to allow user to sign up for an account
  registerUser = (formData) => {
    const { firstName, lastName, username, age, password } = formData;
    console.log(formData);
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        age: age,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((newUserInfo) => {
        if (newUserInfo.error_message) {
          this.setState({
            errorMessage: newUserInfo.error_message,
          });
        } else {
          //happens when a user has successfully logged in
          localStorage.token = newUserInfo.token;
          let niceState = {
            ...newUserInfo.user.user,
            token: newUserInfo.token,
          };
          console.log(niceState);
          this.setState(niceState);
          this.props.history.push("/");
        }
      });
  };

  logOut = () => {
    //resets state back to what it was before a user logged in
    this.setState({
      allQuotes: [],
      id: 0,
      full_name: "",
      age: 0,
      quotes: [],
      favorites: [],
      token: "",
      errorMessage: "",
    });

    //clear out token from localStorage
    localStorage.clear()

    //sends user back to login page
    this.props.history.push("/login");

  };
  //==================================================================//

  //CRUD methods
  //method to add a new quote; needs to make use of the auth token in the headers
  addNewQuote = (quoteObj) => {
    fetch("http://localHost:3000/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: this.state.token,
      },
      body: JSON.stringify({
        content: quoteObj.quoteText,
        author: quoteObj.author,
      }),
    })
      .then((res) => res.json())
      .then((newQuoteObj) => {
        //need to add it into the state of quotes non-destructively
        const updatedUserQuotes = [...this.state.quotes, newQuoteObj.quote];
        const updatedAllQuotes = [...this.state.allQuotes, newQuoteObj.quote];

        this.setState({
          quotes: updatedUserQuotes,
          allQuotes: updatedAllQuotes,
        });
      });
  };

  //creating one method that will allow me to delete from both favorites and quotes
  deleteQuote = (quoteId) => {
    fetch(`http://localhost:3000/quotes/${quoteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: this.state.token,
      },
    })
      .then((res) => res.json())
      .then((deletedQuoteObj) => {
        //update the arrays allQuotes and quotes in the state
        const filteredUserQuotes = this.state.quotes.filter(
          (quote) => quote.id !== deletedQuoteObj.quote.id
        );
        const filteredAllQuotes = this.state.allQuotes.filter(
          (quote) => quote.id !== deletedQuoteObj.quote.id
        );

        this.setState({
          quotes: filteredUserQuotes,
          allQuotes: filteredAllQuotes,
        });
      });
  };

  handleProfileEdit = (userObj) => {
    //update info in backend
    fetch(`http://localhost:3000/users/${this.state.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: this.state.token,
      },
      body: JSON.stringify({ ...userObj }),
    })
      .then((res) => res.json())
      .then((updatedUserObj) => {
        this.setState({ ...updatedUserObj.user });
      });
  };

  addNewFavorite = (quoteId) => {
    if (quoteId) {
      fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: this.state.token,
        },
        body: JSON.stringify({
          id: quoteId,
        }),
      })
        .then((res) => res.json())
        .then((newFavoriteObj) => {
          if (newFavoriteObj.error_message) {
            alert(newFavoriteObj.error_message);
          } else {
            //update the state of the user's favorites array
            const newFavoritesArr = [
              ...this.state.favorites,
              newFavoriteObj.favorite,
            ];
            this.setState({
              favorites: newFavoritesArr,
            });
            alert("Successfully added quote to favorites!");
          }
        });
    }
  };

  deleteFavorite = (favoriteId) => {
    fetch(`http://localhost:3000/favorites/${favoriteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: this.state.token,
      },
    })
      .then((res) => res.json())
      .then((deletedFavoriteObj) => {
        //update the array of favorites in the state
        const filteredfavorites = this.state.favorites.filter(
          (favorite) => favorite.id !== deletedFavoriteObj.favorite.id
        );

        this.setState({
          favorites: filteredfavorites,
        });
      });
  };

  //===================================================
  //methods for nested routing

  render() {
    return (
      <div className="App">
        <Header logOut = {this.logOut} />
        {/* <p style = {{fontWeight:"bold"}}>{this.state.errorMessage}</p> */}
    {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : null}
        <Switch>
          <Route path="/login" exact>
            <SignIn logInUser={this.logInUser} />
          </Route>

          <Route path="/" exact>
            <Home currentUser={this.state} history={this.props.history} />
          </Route>

          <Route path="/signup" exact>
            <SignUp registerUser={this.registerUser} />
          </Route>

          <Route path="/quote-generator" exact>
            <QuoteContainer
              addNewFavorite={this.addNewFavorite}
              currentUser={this.state}
              quotes={this.state.allQuotes}
            />
          </Route>

          <Route path="/my-quotes" exact>
            <MyQuoteContainer
              deleteQuote={this.deleteQuote}
              addNewQuote={this.addNewQuote}
              quotes={this.state.quotes}
            />
          </Route>

          <Route path="/profile" exact>
            <Profile currentUser={this.state} name={this.state.full_name} age={this.state.age} />
          </Route>

          <Route path="/edit-user-profile" exact>
            <ProfileForm editProfile={this.handleProfileEdit} />
          </Route>

          <Route path="quotes/:id" render={this.renderSpecificQuote} />

          <Route path="/quotes/edit-quote" exact>
            <QuoteUpdate />
          </Route>

          <Route path="/favorites" exact>
            <Favorite
              currentUser={this.state}
              deleteFavorite={this.deleteFavorite}
              favorites={this.state.favorites}
            />
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

const withRouterComponent = withRouter(App);
export default withRouterComponent;
