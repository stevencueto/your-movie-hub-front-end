import React, {useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import SingleMovie from '../movies/SingleMovie'
import '../movies/ShowMovies/movies.css'
import './search.css'

const Search = () => {
	let navigate = useNavigate();
    const [search, setSearch] = useState('')
    const searchRef = useRef(true)
    const [searchMovies, setSearchMovies] = useState([])
    const [page, setPage] = useState(1)
    const [errMessage, setErrMessage] = useState("")

    const searchMovie = async (term) =>{
      const toSend = {
        term : term,
        page: page
      }
        try {
          const searchRequest = await fetch('https://yourmoviehubapi.herokuapp.com/movies/search', {
          method: "POST",
          body: JSON.stringify(toSend),
          headers: {
            "Content-Type": "application/json"
          },
          })
            const searchResponse = await searchRequest.json();
            const searchResults = searchResponse.data
              if(searchResponse.success){
              setSearchMovies(searchResults.results)
              setPage(searchResponse.totalPages)
              setErrMessage('')
            }
        } catch (err) {
          console.log(err, 'errr')
          setErrMessage('Internal Server Error')
        }
      }

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current = false;
          return;
        }
    
        const timer = setTimeout(() => {
          searchMovie(search);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, [setSearch, search]);
    useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) navigate("/", { replace: true });
	}, [])
  return (
    <section className="main-dashboard">
			{errMessage ? <p className='error-mesage'> {errMessage} </p> : null}
        <form className='search-form' onSubmit={(e)=> e.preventDefault()}>
          <label className="search-label"htmlFor="search">Search</label>
            <input 
            type="text"
            name="search"
            value={search}
            ref={searchRef}
            className="search-bar "
            onChange={(e) => {setSearch(e.target.value)}}
            />          
        </form>

        <div className="movie-grid">
				{ searchMovies && searchMovies.map( (movie) => { return <SingleMovie key={movie.id} movie={movie} > </SingleMovie> })}
        </div>
    </section>
  )
}

export default Search