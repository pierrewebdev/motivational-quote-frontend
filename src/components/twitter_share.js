import React from "react";

export default function ShareTweet(props) {
  const mainUrl = "https://twitter.com/intent/tweet?text=";
  const completeUrl = `${mainUrl}A quote from \"Motivate Me\" \n ${props.quote.replace(
    /\s/g,
    "%20"
  )}`;
  console.log(completeUrl);
  return (
    <>
      <a className="twitter-share-button" href={completeUrl}>
      <i class="fa fa-twitter" aria-hidden="true"></i> <span style ={{fontSize:"18px"}}>Share</span>
      </a>
    </>
  );
}
