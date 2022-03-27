import React from 'react'

const SingleMovie = (props) => {
    console.log(props.movie.title, "1221")
  return (
    <div>
        <p>{props.movie.title}</p>
    </div>
  )
}

export default SingleMovie