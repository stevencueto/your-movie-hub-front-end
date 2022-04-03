import { useState, useEffect } from "react";
const MovieStats = (props) => {
 
  return (
    <div className="stats taller">{
     props.movie.budget > 0 ?
      <>
        <h4> Budget</h4>
        <p> ${Number(props.movie.budget).toLocaleString()}</p>
      </> 
     : null  }        
       
        <h4> Status</h4>
        <p>{props.movie.status}</p>
        {
          props.movie.rating ? 
          <>
           <h4> Rating</h4>
          <p>  {props.movie.rating}</p>
          </>
          : null 
        }{
          props.movie.vote_average ? 
          <>
        <h4> Vote Average</h4>
        <p> {props.movie.vote_average}</p>
          </>
          : null 
        }
       
        
        <h4> Release Date </h4>
        <p>{props.movie.release_date}</p>
        { props.movie.revenue ? 
        <>
        <h4> Revenue </h4>
        <p>${Number(props.movie.revenue).toLocaleString()} </p>
        </>
        : null 
        }
        <h4> Runtime </h4>
        <p> {props.total} mins</p>
    </div>
  )
}


export default MovieStats;
