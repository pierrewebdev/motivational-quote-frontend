import React from "react"
import { Link } from "react-router-dom"


export default class ProfileForm extends React.Component{

    state = {
        firstName:"",
       lastName:"",
        username:"",
        age:0,
      }
    
      handleUserInput = (evt) =>{
        const inputName = evt.target.name
        console.log(inputName)
        this.setState({
          [inputName]:evt.target.value
        })
       }
     
       handleSubmit = (evt) =>{
         evt.preventDefault()
         //pass this info back up to the <App/> to make a post request
         this.props.editProfile(this.state)
       }
    
    render(){
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <label htmlFor = "firstName">First Name: </label>
                    <input required = "required" type = "text" name = "firstName" value = {this.state.firstName} onChange = {this.handleUserInput}/>
                    <br/>
                    <label htmlFor = "lastName">Last Name: </label>
                    <input required = "required" type = "text" name = "lastName" value = {this.state.lastName} onChange = {this.handleUserInput}/>
                    <br/>
                    <label htmlFor = "username">Username: </label>
                    <input required = "required" type = "text" name = "username" value = {this.state.username} onChange = {this.handleUserInput}/>
                    <br/>
                    <label htmlFor = "age">Age: </label>
                    <input required = "required" type = "number" name = "age" value = {this.state.age}onChange = {this.handleUserInput}/>
                    <br/>
                    <input type = "submit"name = "submit"/>
                </form>
            </div>
        )
    }
}