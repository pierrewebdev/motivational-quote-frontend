import React from "react";
import { Route, Link } from "react-router-dom";
import { Card } from "semantic-ui-react";

//a single quote object will be the props here
export default function MyQuote(props) {
  //each quote is an Object with these keys: id, content, author
  const content = props.content;
  const author = props.author;

  const handleDelete = (evt) => {
    if (props.deleteQuote) {
      props.deleteQuote(props.id);
    } else {
      props.deleteFavorite(props.favoriteId);
    }
  };


  return (
    <div className = "favorites-div">
      <Card>
        <Card.Content description={content} />
        <Card.Content extra>
          Author: {author}
        </Card.Content>
        <div className="side-by-side-btns">
          <button className = "ui inverted violet button" onClick={handleDelete}>Delete</button>
        </div>
      </Card>
    </div>
  );
}
