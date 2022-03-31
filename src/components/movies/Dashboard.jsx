import React, { useEffect, useState} from 'react'
import * as jose from 'jose'
import { useNavigate} from 'react-router-dom'
import SingleMovie from './SingleMovie'
import './ShowMovies/movies.css'
import PageButton from '../PageButton'
const Dashboard = () => {
	let navigate = useNavigate();
	const [trendingMovies, setTrendingMovies] = useState([])
	const [pages, setPages] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
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
	const populateTrendingMovies = async(page = 1) => {
			try{
				const movieRequest = await fetch(`https://yourmoviehubapi.herokuapp.com/movies/trending/${page}`, {
					method: "GET",
					headers: {
					  "Content-Type": "application/json"
					}
				  })
				const fetchMovieResponse = await movieRequest.json()
				const newTrendingMovie = fetchMovieResponse.data
			if(newTrendingMovie.results){
				console.log(newTrendingMovie.page)
				setCurrentPage(newTrendingMovie.page)
				setTrendingMovies(newTrendingMovie.results);
				makePages(newTrendingMovie?.total_pages)
				};
		}catch(err){
			console.error(err)
		}
	}
	const verifyUser = () =>{
		const token = localStorage.getItem('token')
		if (!!token) {
			const user = jose.decodeJwt(token)
			if (!user) {
				localStorage.removeItem('token')
				navigate("/", { replace: true });
			} else {
				populateTrendingMovies()
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
			<h1 className='center-title'>Trending Movies</h1>
			<section className='movie-grid'>
				{ trendingMovies && trendingMovies.map( (movie, index) => { return <SingleMovie key={movie.id} movie={movie} > </SingleMovie> })}
			</section>
			<PageButton pages={pages} populateTrendingMovies={populateTrendingMovies}></PageButton>
		</main>
	)
}

export default Dashboard