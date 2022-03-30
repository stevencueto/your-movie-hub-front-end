import React, { useEffect, useState} from 'react'
import * as jose from 'jose'
import { useNavigate, Route, Routes, Link, Navigate} from 'react-router-dom'
import SingleMovie from './SingleMovie'
import './ShowMovies/movies.css'

const Dashboard = () => {
	let navigate = useNavigate();
	const [trendingMovies, setTrendingMovies] = useState([])
	const [pages, setPages] = useState(1)
	const populateTrendingMovies = async() => {
			try{
				const movieRequest = await fetch('https://yourmoviehubapi.herokuapp.com/movies/trending', {
					method: "GET",
					headers: {
					  "Content-Type": "application/json"
					}
				  })
				const fetchMovieResponse = await movieRequest.json()
				const newTrendingMovie = fetchMovieResponse.data
			if(newTrendingMovie.results){
				setTrendingMovies(newTrendingMovie.results);
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
	return (
		<main className="wrapper" key={'main-dashboard'} >
			<h1 className='center-title'>Trending Movies</h1>
			<section className='movie-grid'>
				{ trendingMovies && trendingMovies.map( (movie, index) => { return <SingleMovie key={movie.id} movie={movie} > </SingleMovie> })}
			</section>


		</main>
	)
}

export default Dashboard