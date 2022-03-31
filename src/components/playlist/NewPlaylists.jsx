import { Modal, Button } from "react-bootstrap"
import { useState } from "react"
const NewPlaylists = (props) => {
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
  
	return (
    <section>
			<Button key='idx'  className="btn display-block" onClick={() => setShow(true)}>
			Make New Playlist?
			</Button>
		<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
			<Modal.Header className="display-flex">
			<Modal.Title id="ok-margin"> <Button onClick={()=> {setShow(true); setShow(false)}}>Close</Button>	</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<form className="login-form register-form"onSubmit={(e)=> props.newPlaylistReq(e)}>
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
			</Modal.Body>
		</Modal>
    </section>
  )
}

export default NewPlaylists