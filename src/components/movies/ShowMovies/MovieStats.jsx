import { useState, useEffect } from "react";
const MovieStats = (props) => {
  const [total, setTotal] = useState("") 
  const runTime = () =>{
    let totalMinutes = props.movie.runtime
    const hours = Math.floor(totalMinutes / 60);          
    const mins = totalMinutes % 60;
    const newTime = `${hours} hr and ${mins} minutes`
    setTotal(newTime)
    }

  useEffect(()=>{
    runTime()
  },[])
  return (
    <div className="stats">{
     props.movie.budget > 0 ?
      <>
        <h4> Budget</h4>
        <p> {props.movie.budget}</p>
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
        <p>{props.movie.revenue}</p>
        </>
        : null 
        }
        <h4> Runtime </h4>
        <p> {total} mins</p>
    </div>
  )
}


export default MovieStats;
