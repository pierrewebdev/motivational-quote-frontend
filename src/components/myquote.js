import React from "react";
import { Route,Link } from "react-router-dom";

//a single quote object will be the props here
export default function MyQuote(props) {
  //each quote is an Object with these keys: id, content, author
  const content = props.content;
  const author = props.author;

  const handleDelete = (evt) =>{
    if (props.deleteQuote){
        props.deleteQuote(props.id)
    }
    else{
        props.deleteFavorite(props.favoriteId)
    }
}

  return (
    <div style={{ margin: "10px" }}>
      <p style={{ fontSize: "18px" }}>{`"${content}"`}</p>
      <p style={{ fontSize: "15px" }}>~{author}</p>
      
      <div className = "side-by-side-btns">
        <button onClick = {handleDelete}>Delete</button>
      </div>
    </div>
  );
}