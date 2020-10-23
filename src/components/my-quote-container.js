import React from "react";
import MyQuote from "./myquote.js";

export default class MyQuoteContainer extends React.Component {
    state = {
        quoteText:"",
        author:""
    }

    userQuoteCollection = () => {
        return this.props.quotes.map( (quote) => {
            return (<li key = {quote.id}>
                <MyQuote deleteQuote = {this.props.deleteQuote} id = {quote.id} content = {quote.content} author = {quote.author}/>
            </li>)
        })
    }

//=====================form methods========================= 
    handleUserInput = (evt) =>{
        const inputName = evt.target.name

        this.setState({
          [inputName]:evt.target.value
        })
       }
     
       handleSubmit = (evt) =>{
         evt.preventDefault()
         //pass this info back up to the <App/> to make a post request
         this.props.addNewQuote(this.state)
       }
  render() {
      const formStyle = {
        margin:"50px"
      }

        const authorInput = {
            width:"22%",
            padding:"5px"
        }
    return (
    <>
      <form style = {formStyle} onSubmit = {this.handleSubmit}>
        <label className = "form-label" htmlFor = "quoteText">What will the Quote Say?</label>
        <br/>
       <textarea required="required" name = "quoteText" rows = "5" cols = "30" value = {this.state.quoteText} onChange = {this.handleUserInput}></textarea>
        <br/>
        <label className = "form-label" htmlFor = "author">Who made it?</label>
        <br/>
        <input required="required" style = {authorInput} type = "text" name = "author" value = {this.state.author} onChange = {this.handleUserInput}/>
        <br/>
        <br/>
        <input className = "ui violet button" type = "submit" value = "Add Quote" />
      </form>

      <div>
          <ul>
          {this.userQuoteCollection()}
          </ul>
      </div>
    </>
    );
  }
}
