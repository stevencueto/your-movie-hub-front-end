import React, { useEffect, useState, useRef } from 'react'
import * as jose from 'jose'
import { useNavigate } from 'react-router-dom'
import SingleMovie from './movies/SingleMovie'

const Dashboard = () => {
	let navigate = useNavigate();
	const [favoriteMovies, setFavoriteMovies] = useState([])
	const [newFavMovie, setNewFavMovie] = useState({
		title: "",
		releaseDate: "",
		summary: "",
		image: ""
	})
	const handleNewMovie = (e) =>{
        const {name, value, type, checked} = e.target
		setNewFavMovie(prev => {
            return {
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }
        })		
	}
	const populateFavoriteMovies = async() => {
		try{
			const movieRequest = await fetch('http://localhost:3001/favorite-movies/user', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
				},
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
			// console.log(user)
			if (!user) {
				localStorage.removeItem('token')
				navigate("/", { replace: true });
			} else {
				populateFavoriteMovies()
			}
		}
	}, [])

	const makeNewFavoriteMovie = async(e) => {
		e.preventDefault()
		try{
			const newMovieReq = await fetch('http://localhost:3001/favorite-movies/', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": localStorage.getItem('token')
			},
			body: JSON.stringify(newFavMovie),
			})
			const newMovieRes = await newMovieReq.json()
			if (newMovieRes.success) {
				setFavoriteMovies([newFavMovie, ...favoriteMovies.data])
				setNewFavMovie({
					title: "",
					releaseDate: "",
					summary: "",
					image: ""
				})
			} else {
				alert(newMovieRes.data)
			}
		}catch(err){
			console.error(err)
			alert("Server is down")
		}
		
	}
	return (
		<>
		<div key={"div"}>
			<h1 key={'121212'}>Your Movies</h1>
			{ favoriteMovies.map(
				(movie, index) => {
					return !movie ? '' : <SingleMovie key={`${movie._id}${index}`} movie={movie}></SingleMovie>
				}
				)}   
			<form key={"form"} onSubmit={makeNewFavoriteMovie}>
				<input
					type="text"
					placeholder="Movie Title"
					value={newFavMovie.title}
					name="title"
					onChange={handleNewMovie}
					required
				/>
				<input
					type="text"
					placeholder="Release Date"
					value={newFavMovie.releaseDate}
					name="releaseDate"
					onChange={handleNewMovie}
					required
				/>
				<textarea 
					value={newFavMovie.summary}
					placeholder="Summary"
					onChange={handleNewMovie}
					name="summary"
				/>
				<input
					type="text"
					placeholder="Image"
					value={newFavMovie.image}
					name="image"
					onChange={handleNewMovie}
					required
				/>
				<button type="submit">MakeNewMovie</button>
			</form>
		</div>
		</>
	)
}

export default Dashboard