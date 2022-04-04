import React from 'react'
import SingleMovie from '../movies/SingleMovie'
const MoviesPlaylist = (props) => {
  return (
    <div className='playlist-flex'>

		{ props.movies ? props.movies.map( (movie, index) => { 
      return  <> 
        <div key={`${movie.id}${index}`} className='with-btn'>
          <SingleMovie movie={movie} />
          <span className='edit' onClick={()=> props.removeMovie(movie, props.playlistId)}>X</span>
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