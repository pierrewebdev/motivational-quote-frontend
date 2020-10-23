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
        {/* <p style={{ fontSize: "18px" }}>{`"${content}"`}</p>
        <p style={{ fontSize: "15px" }}>~{author}</p> */}

        <div className="side-by-side-btns">
          <button onClick={handleDelete}>Delete</button>
        </div>
      </Card>
    </div>
  );
}
