import React from 'react'
import SingleMovie from '../movies/SingleMovie'
const MoviesPlaylist = (props) => {
  return (
    <div className='playlist-flex' key={`${props.movies[0].id}+33`}>

		{ props.movies ? props.movies.map( (movie, index) => { 
      return  <> 
        <div className='with-btn'>
          <SingleMovie key={movie[0]._id} movie={movie[0]} />
          <button className='btn blocked' key={`${movie[0]._id}remove`} onClick={()=> props.removeMovie(movie[0], props.playlistId)}> Remove? </button>
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