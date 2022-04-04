import React, { useEffect, useState, useRef} from 'react'
import * as jose from 'jose'
import { useNavigate} from 'react-router-dom'
import './ShowMovies/movies.css'
import PageButton from './PageButton'
import MovieGrid from './MovieGrid'
import './ShowMovies/movies.css'
const Dashboard = () => {
	let navigate = useNavigate();
	const refFrom = useRef(false)
	const [movies, setMovies] = useState([])
	const [pages, setPages] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [toReq, setToReq] = useState('trending')
	const [title, setTitle] = useState('Trending')
	const [errMessage, setErrMessage] = useState('')
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
				setTitle(matchTitles.toReq)
				setCurrentPage(newTrendingMovie.page)
				setMovies(newTrendingMovie.results);
				makePages(newTrendingMovie?.total_pages)
				setErrMessage('')
				refFrom.current.focus()
			}else{
				setErrMessage(fetchMovieResponse.data)
			}
		}catch(err){
			setErrMessage('server error')
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
			<form className="form-api-req">
				<select name="to-reque" id="form-main" value={toReq} onChange={(e)=> setToReq(e.currentTarget.value)} ref={refFrom}>
					<option value="trending">Trending</option>
					<option value="top-rated">TopRated</option>
					<option value="upcoming">Upcoming</option>
					<option value="now-playing">Now Playling</option>
				</select>
				<button className='btn smaller-btn' onClick={(e)=>{e.preventDefault(e); populateFunction()}}>Get Movies</button>
			</form>
			{errMessage ? <p className='error-message'>{errMessage}</p> :  null}
			<h1 className='center-title'>{title}</h1>
			<MovieGrid movies={movies}></MovieGrid>
			<PageButton pages={pages} populateFunction={populateFunction}></PageButton>
		</main>
	)
}

export default Dashboard