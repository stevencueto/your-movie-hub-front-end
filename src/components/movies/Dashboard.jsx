import React, { useEffect, useState} from 'react'
import * as jose from 'jose'
import { useNavigate, Route, Routes, Link, Navigate} from 'react-router-dom'
import SingleMovie from './SingleMovie'
import './ShowMovies/movies.css'

const Dashboard = () => {
	let navigate = useNavigate();
	const [trendingMovies, setTrendingMovies] = useState([])
	const populateTrendingMovies = async() => {
		const oldTrending = localStorage.getItem('trending');
		if(localStorage.getItem('trending')) return setTrendingMovies(JSON.parse(oldTrending));
			try{
				const movieRequest = await fetch('https://yourmoviehubapi.herokuapp.com/movies/top-rated/', {
					method: "GET",
					headers: {
					  "Content-Type": "application/json"
					}
				  })
				const fetchMovieResponse = await movieRequest.json()
				const newTrendingMovie = fetchMovieResponse.data
			if(newTrendingMovie){
					localStorage.setItem('trending', JSON.stringify(newTrendingMovie));
					setTrendingMovies(newTrendingMovie);
				  };
		}catch(err){
			console.error(err)
		}
	}
	const verifyUser = () =>{
		const token = localStorage.getItem('token')
		console.log(token)
		if (!!token) {
			const user = jose.decodeJwt(token)
			console.log(user)
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