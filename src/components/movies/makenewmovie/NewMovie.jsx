import React from 'react'
import { Outlet } from 'react-router-dom'

const NewMovie = (props) => {
  return (
    <div >
        <Outlet/>
        <form  onSubmit={
            (e) =>{
            e.preventDefault()
            props.makeNewFavoriteMovie(e)
            }
            }>
				<input
					type="text"
					placeholder="Movie Title"
					value={props.newFavMovie.title}
					name="title"
					onChange={props.handleNewMovie}
					required
				/>
				<input
					type="text"
					placeholder="Release Date"
					value={props.newFavMovie.releaseDate}
					name="releaseDate"
					onChange={props.handleNewMovie}
					required
				/>
				<textarea 
					value={props.newFavMovie.summary}
					placeholder="Summary"
					onChange={props.handleNewMovie}
					name="summary"
					required
				/>
				<input
					type="text"
					placeholder="Image"
					value={props.newFavMovie.image}
					name="image"
					onChange={props.handleNewMovie}
					required
				/>
				<button type="submit">MakeNewMovie</button>
			</form>

    </div>
  )
}

export default NewMovie