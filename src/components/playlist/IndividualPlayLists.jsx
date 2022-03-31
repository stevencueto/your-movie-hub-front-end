import React from 'react'
import SingleMovie from '../movies/SingleMovie'
import { Link } from 'react-router-dom'
import MoviesPlaylist from './MoviesPlaylist.jsx'
const IndividualPlayLists = (props) => {
    const movies = props.playlist.movie;
  return (
    <div className="name">
        <h3> {props.playlist.name}</h3>
        <p>{props.playlist.description}</p>
         { !movies && <MoviesPlaylist movies={movies}/>}
         <Link className='website-link' to="/search">Add movies</Link>
   </div>
  )
}

export default IndividualPlayLists