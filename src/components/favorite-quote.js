import React from "react"
import { NavLink } from "react-router-dom"
import MyQuote from "./myquote"



export default class Favorite extends React.Component{


    
    userFavorites = () => {
        return this.props.favorites.map( (favorite) => {
            return (<li key = {favorite.id}>
                <MyQuote deleteFavorite = {this.props.deleteFavorite} favoriteId = {favorite.id} id = {favorite.quote.id} content = {favorite.quote.content} author = {favorite.quote.author}/>
            </li>)
        })
    }


    render(){
        const favoriteComponent = (
            this.props.favorites.length<1 ?
                <p style = {{fontSize:"25px",marginTop:"50px"}}>You have not added any Favorites yet...</p>
                :
                <ul>
                    <h2>All your Favorites</h2>
                    {this.userFavorites()}
                </ul>
        )
        const logInFirst = (
            <div>
                <p>Sorry you can't view this page until you log in or create an account</p>
                <p>But as soon as you do we can give you all the motivation you need!</p>
                <br/>
                <NavLink to = "/login"><button className = "ui button" >Log in here</button></NavLink>
            </div>
        )
        return this.props.currentUser.id ? favoriteComponent : logInFirst
    }
}