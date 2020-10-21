import React from "react"

export default class Home extends React.Component{
    render(){
        // console.log(this.props.currentUser.user)
        const homePage = (
            <>
                <h1>Hello and Welcome to Motivate Me</h1>
                <p>Motivate Me is an application that functions to give the extra motivation that you need to be your best you!</p>
            </>
        )
        return this.props.currentUser.id ? homePage : <p>Need to log in first</p>
    }
}