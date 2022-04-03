import noImg from '../../../images/no-pic.jpeg'

const Cast = (props) => {
    const profilePath = `http://image.tmdb.org/t/p/w300${props.cast?.profile_path}`
    const img = props.cast?.profile_path ? profilePath : noImg 
  return (
    <div className='cast-single'>
        <img className="cast-crew-photo" src={img} alt={`${props.cast.name} profile photo`}/>
        <div className='person-details'>
            <h4>{props.cast.name}</h4>
            <p>{props.cast.popularity}</p>
            <p>{props.cast.character}</p>
        </div>
    </div>
  )
}
export default Cast;
