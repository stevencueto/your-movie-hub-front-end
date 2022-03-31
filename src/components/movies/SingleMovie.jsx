import { Link } from 'react-router-dom'
import './ShowMovies/movies.css'
import  fakePoster from '../../images/not-movie-pic.jpeg'
const SingleMovie = (props) => {
  const imgPath = `http://image.tmdb.org/t/p/w780${props.movie.poster_path}`
  const img = !!props.movie.poster_path ? imgPath : fakePoster
  const handleClick = () => {
    console.log('click')
  }
  return (
    <div key={props.movie._id} className="max-width">
        <img onClick={()=> handleClick()} className='poster' src={img} alt="" />
    </div>
  )
}

export default SingleMovie