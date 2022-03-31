import React from 'react'
import SingleMovie from '../movies/SingleMovie'
const MoviesPlaylist = (props) => {
  return (
    <div className='playlist-flex'>
		{ props.movies && props.movies.map( (movie, index) => { return <SingleMovie key={movie.id} movie={movie} > </SingleMovie> })}
    </div>
  )
}

export default MoviesPlaylist