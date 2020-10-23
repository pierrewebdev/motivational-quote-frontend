import React from "react"
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
        return(
            this.props.favorites.length<1 ?
                <p>You have not added any Favorites yet...</p>
                :
                <ul>
                    {this.userFavorites()}
                </ul>
        )
    }
}