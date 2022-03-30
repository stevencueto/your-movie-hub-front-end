
const NewPlaylists = (props) => {

  return (
    <section>
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

    </section>
  )
}

export default NewPlaylists