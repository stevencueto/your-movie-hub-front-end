import './moviedescription.css'
import {Link} from "react-router-dom"
import AddToPlayLists from './AddToPlayLists'
import MovieStats from './MovieStats'
import Production from './Production'
import Information from './Information'
const PlotAndMore = (props)=> {
    const imbd = `https://www.imdb.com/title/${props.movie.imdb_id}`
  
    console.log(props.movie.runtime, "run time")
  return (
    <div className='movie-plo'>
      <div className='movie-plot-grid'>
        <Information movie={props.movie}/>
        <Production movie={props.movie}/>
        <MovieStats movie={props.movie}/>
      </div>
        
        <AddToPlayLists addNewMovie={props.addNewMovie} movie={props.movie} allMyPlaylists={props.allMyPlaylists} ></AddToPlayLists> 
        {props.homepage}
        <Link className='btn' to={{ pathname: props.homepage }} target="_blank" >Watch Movie?</Link>
    </div>
  )
}

export default PlotAndMore