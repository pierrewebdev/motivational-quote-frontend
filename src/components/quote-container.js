import React from "react";
import Quote from "./quote.js"

export default class QuoteContainer extends React.Component {
  //state object to store the current quote being rendered
  state = {
    quote:{
      content:`Press the Get New Quote Button to get started`,
      author:"Motivate Me"
    }
  }

  randomIndex = () => {
    return Math.floor(Math.random() * Math.floor(this.props.quotes.length));
  };


  updateCurrentQuote = () =>{
    const quoteArrIndex = this.randomIndex()
    const newQuote = this.props.quotes[quoteArrIndex]
    this.setState({
      quote:{...newQuote}
    },() => {console.log(this.state)})
  }



  render(){
    // console.log(this.state)
    // console.log(this.props)
    return (
      <>
        <Quote content = {this.state.quote.content} author = {this.state.quote.author}/>
        <button
          onClick={() => this.updateCurrentQuote()}
          style={{ width: "15%", padding: "8px" }}
        >
          Get a New Quote
        </button>
      </>
    );
  }
}
