import {Button } from "react-bootstrap"
import React, { useState } from "react"



const EditPlayList = (props) => {
    const [toEdit, setToEdit] = useState({
        name: props.playlist.name,
        description: props.playlist.description,
        _id: props.playlist._id,
    })
    const handleChange = (e) => {
        const {name, value } = e.target;
        setToEdit(prev => {
          return {
              ...prev,
              [name]: value
          }
        })
      }
    const handleFrom = (e) =>{
        e.preventDefault()
        props.handleShow()
        props.editPlayListRequest(toEdit)
    }
	return (
        <form className="edit-form"onSubmit={handleFrom}> 
            <p className="hide" onClick={props.handleShow}>hide</p>
            <input
                value={toEdit.name}
                onChange={(e)=> handleChange(e)}
                type="text"
                placeholder="Name"
                name="name"
                autoComplete="off"
                className='login-input'
                required
            />
            <textarea
                value={toEdit.description}
                onChange={ (e)=> handleChange(e)}
                placeholder="Description"
                name="description"
                className='description-box'
                required
            />
            <button className='btn  blocked-element'>Submit</button>
        </form>

  )
}

export default EditPlayList;