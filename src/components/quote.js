import React from "react";

//a single quote object will be the props here
export default class Quote extends React.Component {
  //stores the state of the like button
  state = {
    buttonBoolean:false
  }

  handleClick = (evt) =>{
    //send the switched state back as props then update this component's state
    // console.log(this.props.id)
    this.props.addNewFavorite(this.props.id)

    this.setState({
      buttonBoolean: !this.state.buttonBoolean
    })
  }

  buttonToMatchBool = () =>{
    let likeBtn;
    if (this.state.buttonBoolean){
      likeBtn = (<p style={{ fontSize: "18px",fontWeight:"bold",color:"black" }} >Like <i onClick = {this.handleClick} style={{ fontSize: "18px" }} className="fa fa-thumbs-up" aria-hidden="true"></i></p>)
    }
    else{
      likeBtn = (<p style={{ fontSize: "18px",fontWeight:"bold" }} >Like <i onClick = {this.handleClick} style={{ fontSize: "18px",color:"grayscale" }} className="fa fa-thumbs-up" aria-hidden="true"></i></p>)
    }
    return likeBtn
  }

  render(){

    //each quote is an Object with these keys: id, content, author
    const content = this.props.content;
    const author = this.props.author;


    return (
      <div style={{ margin: "50px" }}>
        <p style={{ fontSize: "18px" }}>{`"${content}"`}</p>
        <p style={{ fontSize: "15px" }}>~{author}</p>
        {this.buttonToMatchBool()}
      </div>
    );
  }
}
