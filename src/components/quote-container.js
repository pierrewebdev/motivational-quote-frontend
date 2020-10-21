import React from "react";
import Quote from "./quote.js"
import {Link} from "react-router-dom"

export default class QuoteContainer extends React.Component {
  //state object to store the current quote being rendered
  state = {
    index:0
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
    // console.log(this.state)
    // console.log(this.props)
    let foundQuote = this.props.quotes[this.state.index]
    let content = foundQuote ? foundQuote.content : ""
    let author = foundQuote ? foundQuote.author : ""
    
    const quoteContainer = (
      <>
        <Quote content = {content} author = {author}/>
        <button
          onClick={() => this.updateCurrentQuote()}
          style={{ width: "15%", padding: "8px" }}
        >
          Get a New Quote
        </button>
        <p> <Link to = "/my-quotes">My Quotes</Link></p>
      </>
    )

    return this.props.currentUser.id ? quoteContainer : <p>Need to Log in first</p>
  }
}
