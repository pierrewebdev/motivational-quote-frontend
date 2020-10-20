import React from "react";

//a single quote object will be the props here
export default function Quote(props) {
  //each quote is an Object with these keys: id, content, author
  const quote = props.content;
  const quoteAuthor = props.author;

//   console.log(quote,"\n",quoteAuthor)

  return (
    <div style={{ margin: "10px" }}>
      <p style={{ fontSize: "18px" }}>{`"${quote}"`}</p>
      <p style={{ fontSize: "15px" }}>~{quoteAuthor}</p>
    </div>
  );
}
