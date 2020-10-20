import React from "react";

export default class Quote extends React.Component {
  arrayOfQuotes = () => {
    const quotes = [...this.props.quotes];
    return quotes.map((quote) => this.createQuote(quote));
  };

  randomIndex = () => {
    const quotes = this.arrayOfQuotes();
    return Math.floor(Math.random() * Math.floor(quotes.length));
  };


  createQuote = (quoteObject) => {
    //each quote is an Object with these keys: id, content, author
    const quote = quoteObject.content;
    const quoteAuthor = quoteObject.author;

    return (
      <div style={{ margin: "10px" }}>
        <p style={{ fontSize: "18px" }}>{`"${quote}"`}</p>
        <p style={{ fontSize: "15px" }}>{quoteAuthor}</p>
      </div>
    );
  };


  displayQuote = () => {
    const quotes = this.arrayOfQuotes();
    console.log("hit me")
    return (
      <div style={{ marginTop: "100px" }}>{quotes[this.randomIndex()]}</div>
    );
  };


  render() {
    return (
      <>
        {this.displayQuote()}
        <button
          onClick={() => this.displayQuote()}
          style={{ width: "15%", padding: "8px" }}
        >
          Get a New Quote
        </button>
      </>
    );
  }
}
