import React, {useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import SingleMovie from '../movies/SingleMovie'
import '../movies/ShowMovies/movies.css'

const Search = () => {
	let navigate = useNavigate();
    const [search, setSearch] = useState('')
    const searchRef = useRef(true)
    const [searchMovies, setSearchMovies] = useState([])
    const [searchPage, setSearchPage] = useState(1)
    const [errMessage, setErrMessage] = useState("")
    const searchMovie = async (term) =>{
      console.log(search, term)
      let isItIn = localStorage.getItem(term)
      console.table(JSON.parse(isItIn))
      if(isItIn) return setSearchMovies(JSON.parse(isItIn));
      const toSend = {
        term : term,
        page: searchPage
      }
        try {
          const searchRequest = await fetch('http://localhost:3001/movies/search/', {
          method: "POST",
          body: JSON.stringify(toSend),
          headers: {
            "Content-Type": "application/json"
          },
          })
            const searchResponse = await searchRequest.json();
            const searchResults = searchResponse.data
              if(searchResponse.success){
              localStorage.setItem(search, JSON.stringify(searchResults.results));
              setSearchMovies(searchResults.results)
              setErrMessage('')
              console.table(searchResults.results)
            }else{
              setErrMessage(searchResults)
            }
        } catch (err) {
          console.error(err, 'errr')
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
			{!!errMessage && <p className='error-mesage'> {errMessage} </p>}
        <form className='search-form' onSubmit={(e)=> e.preventDefault()}>
          <div>
          <label htmlFor="search">Search</label>
            <input 
            type="text"
            name="search"
            value={search}
            ref={searchRef}
            id="search-input"
            onChange={(e) => {setSearch(e.target.value)}}
            />
            <button className='btn-smller'> 🔍 </button>
          </div>
            
        </form>

        <div className="movie-grid">
				{ searchMovies && searchMovies.map( (movie) => { return <SingleMovie key={movie.id} movie={movie} > </SingleMovie> })}
        </div>
    </section>
  )
}

export default Search