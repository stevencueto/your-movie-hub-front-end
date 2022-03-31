import SingleMovie from "./SingleMovie"

function MovieGrid(props) {
  return (
    <section className='movie-grid'>
				{ props.movies && props.movies.map( (movie, index) => { return <SingleMovie key={movie.id} movie={movie} > </SingleMovie> })}
	</section>
  )
}

export default MovieGrid