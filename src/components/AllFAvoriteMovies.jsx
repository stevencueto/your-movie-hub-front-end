import React, { useEffect, useState } from 'react'
import * as jose from 'jose'
import { useNavigate } from 'react-router-dom'
import SingleMovie from './movies/SingleMovie'

const AllMovies = () => {
	let navigate = useNavigate();
	const [favoriteMovies, setFavoriteMovies] = useState([])
	const populateFavoriteMovies = async() => {
		try{
			const movieRequest = await fetch('https://yourmoviehubapi.herokuapp.com/movies/', {
				method: "GET",
				headers: {
				  "Content-Type": "application/json"
				}
			  })
			const fetchMovieResponse = await movieRequest.json()
			const newFavMovies = fetchMovieResponse.data
			if (fetchMovieResponse.success) {
				setFavoriteMovies(newFavMovies)
			} else {
				alert(fetchMovieResponse.data)
			}
		}catch(err){
			console.error(err)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jose.decodeJwt(token)
			if (!user) {
				localStorage.removeItem('token')
				navigate("/", { replace: true });
			} else {
				populateFavoriteMovies()
			}
		}
	}, [])


		
	return (
		<div key={"div"}>
			<h1 key={'121212'}>Your Movies</h1>
			{ favoriteMovies.map(
				(movie, index) => {
					return !movie ? '' : <SingleMovie key={`${movie._id}12${index}`}  movie={movie}></SingleMovie>
				}
				)}   
		</div>
	)
}

export default AllMovies