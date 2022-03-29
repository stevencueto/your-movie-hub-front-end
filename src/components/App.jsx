import React from 'react'
import WebisteContainer from './WebisteContainer'
import '../App.css'
import ReactDOM from 'react-dom'
import env from "react-dotenv";

const App = () => {
	console.log(window.env.REACT_APP_SERVER_URL)
	return (
		<main className='App'>
			<WebisteContainer/>
		</main>
	)
}

export default App