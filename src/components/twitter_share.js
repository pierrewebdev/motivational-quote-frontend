import React from "react";

export default function ShareTweet(props) {
  const mainUrl = "https://twitter.com/intent/tweet?text=";
  const completeUrl = `${mainUrl}Here is a motivatioinal quote from /"Motivate Me/" --> ${props.quote.replace(
    /\s/g,
    "%20"
  )}`;
  console.log(completeUrl);
  return (
    <div>
      <i class="fa fa-twitter-square" aria-hidden="true"></i>
      <a className="twitter-share-button" href={completeUrl}>
        Share this Motivation on Twitter
      </a>
    </div>
  );
}
