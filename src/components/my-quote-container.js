import React from "react";
import Quote from "./quote.js";

export default class MyQuote extends React.Component {
  render() {
    return (
      <form>
       <textarea rows = "5" cols = "30" placeholder = "Inspirational Quote goes here..."></textarea>
        <br/>
        <input type = "submit" value = "Add Quote" />
      </form>
    );
  }
}
