import React from "react";

//a single quote object will be the props here
export default function Quote(props) {
  //each quote is an Object with these keys: id, content, author
  const content = props.content;
  const author = props.author;

//   console.log(quote,"\n",author)

  return (
    <div style={{ margin: "10px" }}>
      <p style={{ fontSize: "18px" }}>{`"${content}"`}</p>
      <p style={{ fontSize: "15px" }}>~{author}</p>
    </div>
  );
}
