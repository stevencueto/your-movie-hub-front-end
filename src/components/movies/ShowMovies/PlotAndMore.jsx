import './moviedescription.css'
import {Link} from "react-router-dom"
import AddToPlayLists from './AddToPlayLists'
import MovieStats from './MovieStats'
import Production from './Production'
import Information from './Information'
import RecommendedMovies from './RecommendedMovies'
const PlotAndMore = (props)=> {
    const imbd = `https://www.imdb.com/title/${props.movie.imdb_id}`
    return (
    <div className='movie-plo'>
      <div className='movie-plot-grid'>
        <Information movie={props.movie}/>
        <Production movie={props.movie}/>
        <MovieStats total={props.total} movie={props.movie}/>
      </div>
        
        <h3 className='grid-heading'>Similar Movies</h3>
        <RecommendedMovies movies={props.similarMovies} ></RecommendedMovies>
        <h3 className='grid-heading margin-bottom-yes'>Recommended Movies</h3>
        <RecommendedMovies movies={props.recommendedMovies}></RecommendedMovies>
    </div>
  )
}

export default PlotAndMore