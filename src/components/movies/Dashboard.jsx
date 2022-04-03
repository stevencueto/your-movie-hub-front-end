import React, { useEffect, useState} from 'react'
import * as jose from 'jose'
import { useNavigate} from 'react-router-dom'
import './ShowMovies/movies.css'
import PageButton from './PageButton'
import MovieGrid from './MovieGrid'
const Dashboard = () => {
	let navigate = useNavigate();
	const [movies, setMovies] = useState([])
	const [pages, setPages] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [toReq, setToReq] = useState('trending')
	const [title, setTitle] = useState('Trending')
	const makePages = (page) =>{
		const newPages = []
		if(page === 1) return setPages([page])
		for(let i = 1 ; i < page + 1; i++){
			newPages.push(i)
			if(i > 9){
				break; 
			}
		}
		setPages(newPages)
		console.log(pages)
	}
	const matchTitles = {
		"trending": "Trending Movies",
		"top-rated":  "Top Rated",
		"upcoming": "Upcoming",
		"now-playing": "Now Playing"
	}
	const populateFunction = async(page = 1) => {
			try{
				const movieRequest = await fetch(`https://yourmoviehubapi.herokuapp.com/movies/${toReq}/${page}`, {
					method: "GET",
					headers: {
					  "Content-Type": "application/json"
					}
				  })
				const fetchMovieResponse = await movieRequest.json()
				const newTrendingMovie = fetchMovieResponse.data
			if(fetchMovieResponse.success){
				console.log(newTrendingMovie)
				setTitle(matchTitles.toReq)
				setCurrentPage(newTrendingMovie.page)
				setMovies(newTrendingMovie.results);
				makePages(newTrendingMovie?.total_pages)
				}else{
					console.log(fetchMovieResponse, "ha")
				}
		}catch(err){
			console.error(err)
		}
	}
	const verifyUser = () =>{
		console.log('hel;lo')
		const token = localStorage.getItem('token')
		if (!!token) {
			const user = jose.decodeJwt(token)
			if (!user) {
				localStorage.removeItem('token')
				navigate("/", { replace: true });
			} else {
				populateFunction()
			}
		}else{
			navigate("/", { replace: true });
		}
	}
	useEffect(() => {
		verifyUser()
	}, [])
	useEffect(() =>{

	}, [currentPage])
	return (
		<main className="wrapper" key={'main-dashboard'} >
			<form ckassnme="form-api-req">
				<select name="to-reque" id="form-main" value={toReq} onChange={(e)=> setToReq(e.currentTarget.value)}>
					<option value="trending">Trending</option>
					<option value="top-rated">TopRated</option>
					<option value="upcoming">Upcoming</option>
					<option value="now-playing">Now Playling</option>
				</select>
				<button onClick={(e)=>{e.preventDefault(e); populateFunction()}}>Get Movies</button>
			</form>
			<h1 className='center-title'>{title}</h1>
			<MovieGrid movies={movies}></MovieGrid>
			<PageButton pages={pages} populateFunction={populateFunction}></PageButton>
		</main>
	)
}

export default Dashboard