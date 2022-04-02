import { Modal, Button } from "react-bootstrap"
import { useState } from "react"
const NewPlaylists = (props) => {
	const [show, setShow] = useState(false);
	const handleShow =(e)=>{
		e.preventDefault()
		setShow(false)
		props.newPlaylistReq(e)
	}
  
	return (
    <section>
			<Button key='idx'  className="btn display-block" onClick={() => setShow(!show)}>
			Make New Playlist?
			</Button>
			{
				show 
				?
				<form className="login-form register-form margin-form"onSubmit={(e)=> handleShow(e)}>
				<input
					value={props.newPlaylist.name}
					onChange={(e)=> props.handleNewPlaylist(e)}
					type="text"
					placeholder="Name"
					name="name"
					autoComplete="off"
					className='login-input'
					required
				/> 
				<textarea
					value={props.newPlaylist.description}
					onChange={ (e)=> props.handleNewPlaylist(e)}
					placeholder="Description"
					name="description"
					className='description-box'
					required
				/>
				<br />
				<button className='btn  blocked-element' >Make New Playlist</button>
			</form>
			:
			null
			}
			
    </section>
  )
}

export default NewPlaylists