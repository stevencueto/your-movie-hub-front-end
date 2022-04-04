import ReactPlayer from 'react-player'


function Trailer(props) {
  return (
    <div className='player-wrapper'>
        <ReactPlayer
        id="react-player"
        url={`https://www.youtube.com/watch?v=${props.youtubelink.key}`}
        width="100%"
        height="100%"
        controls></ReactPlayer>
    </div>
  )
}

export default Trailer