import React from "react"

export default class QuoteUpdate extends React.Component{
    state = {
        content:"",
        author:""
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
                <h1>Edit Your Quote</h1>
                <form onSubmit = {this.handleSubmit}>
                    <label htmlFor = "content">Content: </label>
                    <textarea required="required" name = "quoteText" rows = "5" cols = "30" value = {this.state.content} onChange = {this.handleUserInput}></textarea><br>
                    </br>
                    <label htmlFor = "lastName">Last Name: </label>
                    <input required = "required" type = "text" name = "lastName" value = {this.state.lastName} onChange = {this.handleUserInput}/>
                    <br/>
                    <br/>
                    <input type = "submit"name = "submit"/>
                </form>
            </div>
        )
    }
}