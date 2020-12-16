import React from "react";
import Quote from "./quote"
import {NavLink,Link} from "react-router-dom"

export default class QuoteContainer extends React.Component {
  //state object to store the current quote being rendered
  state = {
    index:1
  }

  randomIndex = () => {
    return Math.floor(Math.random() * Math.floor(this.props.quotes.length));
  };


  updateCurrentQuote = () =>{
    const quoteArrIndex = this.randomIndex()
    // const newQuote = this.props.quotes[quoteArrIndex]
    this.setState({
      index:quoteArrIndex
    })
  }



  render(){
    let foundQuote = this.props.quotes[this.state.index]
    let id = foundQuote ? foundQuote.id:null
    let content = foundQuote ? foundQuote.content : ""
    let author = foundQuote ? foundQuote.author : ""
    
    const quoteContainer = (
      <div className = "quote-container">
        <h1 style = {{margin:"10px",color:"#444053"}}>Motivational Quotes at the Click of a Button</h1>
        <Quote addNewFavorite = {this.props.addNewFavorite} id = {id} content = {content} author = {author}/>
        <button className = "ui violet button"
          onClick={() => this.updateCurrentQuote()}
          style={{ width: "15%", padding: "8px" }}
        >
          Get a New Quote
        </button>
        <p> <Link to = "/my-quotes"><button style = {{margin:"15px",width:"auto"}} className = "myQuotes-btn ui button">My Quotes  <i className="fa fa-arrow-right" aria-hidden="true"></i></button></Link></p>
      </div>
    )
    const logInFirst = (
      <div>
          <p>Sorry you can't view this page until you log in or create an account</p>
          <p>But as soon as you do we can give you all the motivation you need!</p>
          <br/>
          <NavLink to = "/login"><button className = "ui button">Log in here</button></NavLink>
      </div>
  )

    return this.props.currentUser.id ? quoteContainer : logInFirst
  }
}
