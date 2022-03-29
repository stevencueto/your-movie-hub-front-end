import React, { useEffect, useState} from 'react'
import * as jose from 'jose'
import { useNavigate, Route, Routes, Link, Navigate} from 'react-router-dom'
import SingleMovie from './SingleMovie'
import NewMovie from './makenewmovie/NewMovie'
import NewMovieContainer from './ShowMovies/NewMovieContainer'
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
			console.log(fetchMovieResponse.data, '////////////////')
			if (fetchMovieResponse.success) {
				setFavoriteMovies(newFavMovies)
			} else {
				alert(fetchMovieResponse.data)
			}
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
				populateFavoriteMovies()
			}
		}else{
			navigate("/", { replace: true });
		}
	}
	useEffect(() => {
		verifyUser()
	}, [favoriteMovies, ])

	const makeNewFavoriteMovie = async() => {
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
			console.log(newMovieRes, 'response')
			if (newMovieRes.success) {
				setFavoriteMovies([newFavMovie, ...favoriteMovies])
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

	const editFavoriteMovies = ( movieToEdit) =>{
		const newFavoriteMovies = favoriteMovies.filter((movie) => movie._id === movieToEdit.id ? movieToEdit : movie )
		setFavoriteMovies((prev) => newFavoriteMovies)
	}

	return (
		<div key={'main-dashboard'}>
			<h1 >Your Movies</h1>
			{ favoriteMovies.map(
				(movie, index) => {
					return !movie 
					?
					 '' 
					 :
					<>
						<SingleMovie key={movie._id + 'qwe'} movie={movie} editFavoriteMovies={editFavoriteMovies} ></SingleMovie>
						<Link to={`/movie/${movie._id}/`}> {movie.title} ?</Link>

					</>
				}
				)}

				{ favoriteMovies &&
					<Routes >
						<Route path={`:id`} element={<SingleMovie/>} />
					</Routes> 
				}

			<NewMovieContainer  key={'NewMovieContainer-dash'} editFavoriteMovies={editFavoriteMovies}  newFavMovie={newFavMovie} handleNewMovie={handleNewMovie} makeNewFavoriteMovie={makeNewFavoriteMovie}/>
		</div>
	)
}

export default Dashboard