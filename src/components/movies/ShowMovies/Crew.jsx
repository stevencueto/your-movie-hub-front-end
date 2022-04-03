import noImg from '../../../images/no-pic.jpeg'
const Crew = (props) => {
    const profilePath = `http://image.tmdb.org/t/p/w300${props.crew?.profile_path}`
    const img = props.crew.profile_path ? profilePath : noImg 
  return (
    <div className='cast-single'>
        <img className="cast-crew-photo"src={img} alt={`${props.crew?.name} profile photo`}/>
        <div className="person-details">
            <h4>{props.crew?.name}</h4>
            <p>{props.crew?.popularity}</p>
            <p>{props.crew?.job}</p>
        </div>
      

    </div>
  )
}
export default Crew;
