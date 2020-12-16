import React from "react";
import { NavLink } from "react-router-dom";
import { Grid, Card } from "semantic-ui-react";

export default class Home extends React.Component {
  render() {
    const homeGrid = (
      <>

        <Grid centered = {true} columns={2} padded="horizontally">
          <Grid.Row centered = {true} key="grid1">
            <div onClick = {() => this.props.history.push("/quote-generator")} className = "gridChild">
                <h2>Check out our Quotes</h2>
                <p >Get renewed motivation from our collection of inspiring quotes
    Maybe even submit some quotes of your own...</p>
            </div>
          </Grid.Row>
          <Grid.Row key="gridTwo">
            <div onClick = {() => this.props.history.push("/favorites")}  className = "gridChild">
                <h2>Check out our your Favorite Quotes</h2>
                <p>Here you can see the quotes you favorited See them and get
              inspired all over again!"</p>
            </div>
          </Grid.Row>
        </Grid>
      </>
    );

    const pTagStyles = {
      color: "#444053",
      fontSize: "18px",
    };

    const h1Styles = {
      color: "#444053",
    };
    const homePage = (
      <>
        <h1 style={h1Styles}>Welcome to Motivate Me!</h1>
        <p style={pTagStyles}>
          Motivate Me is an application that functions to give the extra
          motivation that you need to be your best you!
        </p>
        <div className="grid">{homeGrid}</div>
      </>
    );

    const logInFirst = (
      <div>
        <p style={pTagStyles}>
          Sorry you can't view this page until you log in or create an account
        </p>
        <p style={pTagStyles}>
          But as soon as you do we can give you all the motivation you need!
        </p>
        <br />
        <NavLink to="/login">
          <button className = "ui button">Log in here</button>
        </NavLink>
      </div>
    );
    return this.props.currentUser.id ? homePage : logInFirst;
  }
}

