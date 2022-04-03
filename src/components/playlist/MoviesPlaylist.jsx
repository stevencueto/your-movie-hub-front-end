import React from 'react'
import SingleMovie from '../movies/SingleMovie'
const MoviesPlaylist = (props) => {
  return (
    <div className='playlist-flex' key={`${props.movies.id}+33`}>

		{ props.movies ? props.movies.map( (movie, index) => { 
      return  <> 
        <div className='with-btn'>
          <SingleMovie key={movie._id} movie={movie} />
          <button className='btn blocked' key={`${movie._id}remove`} onClick={()=> props.removeMovie(movie, props.playlistId)}> Remove? </button>
        </div>

         </> 
        }) 
        : 
        null
        }
    </div>
  )
}

export default MoviesPlaylist