import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import NewMovie from '../makenewmovie/NewMovie'

function NewMovieContainer(props) {
  return (
    <div key={'NewMovieContainer'}>
                    <Routes path="/movie">
						<Route  path="new" element={<NewMovie newFavMovie={props.newFavMovie} handleNewMovie={props.handleNewMovie} makeNewFavoriteMovie={props.makeNewFavoriteMovie}></NewMovie>}/>
					</Routes>
        <Link to="/movie/new" >Make New Movie?</Link>
    </div>
  )
}

export default NewMovieContainer