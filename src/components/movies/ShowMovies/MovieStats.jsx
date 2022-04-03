
const MovieStats = (props) => {
  return (
    <div>        
        <p>Budget{props.movie.budget}</p>
        <p>Status: {props.movie.status}</p>
        <p> Rating: {props.movie.rating}</p>
        <p> Vote Average: {props.movie.vote_average}</p>
        <p>Release Date {props.movie.release_date}</p>
        <p>revenue {props.movie.revenue}</p>
        <p> Runtime: {props.movie.runtime} mins</p>
    </div>
  )
}


export default MovieStats;
