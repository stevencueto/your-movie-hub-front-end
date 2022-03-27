import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import AllMovies from './components/AllFAvoriteMovies'

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/login" exact element={<Login/>} />
					<Route path="/register" exact element={<Register/>} />
					<Route path="/dashboard" exact element={<Dashboard/>} />
					<Route path="/all" exact element={<AllMovies/>} />

					<Route path="/" exact element={<Home/>} />
					<Route path="*" element={<Navigate to="/all" />}/>

				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App