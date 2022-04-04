import { Link, Routes ,Route } from 'react-router-dom'
import './ShowMovies/movies.css'
import  fakePoster from '../../images/not-movie-pic.jpeg'
const SingleMovie = (props) => {
  const imgPath = `http://image.tmdb.org/t/p/w780${props.movie.poster_path}`
  const img = !!props.movie.poster_path ? imgPath : fakePoster
  const name = props.movie.title || props.movie.name
  return (
    <div key={`${props.movie._id}`} className="max-width">
        <Link className="img-poster" to={`/movie/${name}?movie=${props.movie.id}`}><img className='min-poster' src={img} alt="" /></Link>
    </div>
  )
}

export default SingleMovie