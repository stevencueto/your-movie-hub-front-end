import React from 'react'
import SingleMovie from '../SingleMovie'
const RecommendedMovies = (props) => {
    const movies = props.movies
  return (
    <div className='playlist-flex other-fixes' key={`container`}>
		{ movies ? movies.map( (movie) => { 
            return <SingleMovie key={movie.id} movie={movie} />
        }) 
        : 
        null
        }
    </div>
  )
}

export default RecommendedMovies