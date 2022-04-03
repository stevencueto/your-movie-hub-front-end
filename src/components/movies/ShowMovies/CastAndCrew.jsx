import Cast from "./Cast"
import Crew from "./Crew"
const CastAndCrew = (props) => {
  return (
    <section className='cast-grid'>
        <div className="small-croll">
            { props.cast.length > 0 ? props.cast.map( (cast) => { return <Cast key={cast.credit_id} cast={cast} ></Cast> }) : null}
        </div>
        <div className="small-croll">
            { props.crew.length > 0 ? props.crew.map( (crew) => { return <Crew key={crew.credit_id} crew={crew} ></Crew> }) : null}
        </div>
	</section>

  )
}

export default CastAndCrew