import { Link } from 'react-router-dom'
import './ShowMovies/movies.css'
import  fakePoster from '../../images/not-movie-pic.jpeg'

const SingleMovie = (props) => {
  const imgPath = `http://image.tmdb.org/t/p/w780${props.movie.poster_path}`
  const img = !!props.movie.poster_path ? imgPath : fakePoster

  return (
    <div key={props.movie._id}>
        <h5 className='small-movie-title'>{props.movie.title ||props.movie.name }</h5>
        <Link to={`/movie/${props.movie.id}`}><img className='poster' src={img} alt="" /></Link>
    </div>
  )
}

export default SingleMovie