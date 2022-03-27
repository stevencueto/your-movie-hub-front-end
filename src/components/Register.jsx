import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {
	let navigate = useNavigate();

	const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const  updateNewUser = (e) => {
		console.log()
        const {name, value, type, checked} = e.target
        setNewUser({
                ...newUser,
                [name]: value
            })
		console.log(newUser)

    }

	const registerUser = async(e) =>{
		e.preventDefault()
		console.log(e)
		try{
			const userRequest = await fetch('http://localhost:3001/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser),
			})
			const fetchedUser = await userRequest.json()
			console.log(fetchedUser.data)
			if (fetchedUser.success) {
				localStorage.setItem('token', fetchedUser.data)
				alert('Register Successfully')
				// window.location.href = '/dashboard'
			} else {
				alert(fetchedUser.data)
			}
		}catch(err){
			console.log(err.message)
		}
		
	}
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) navigate("/", { replace: true });
	}, [])
	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={registerUser}>
				<input
					value={newUser.username}
					onChange={updateNewUser}
					type="text"
					placeholder="Username"
					name="username"

				/>
				<br />
				<input
					value={newUser.email}
					onChange={updateNewUser}
					type="email"
					placeholder="Email"
					name="email"

				/>
				<br />
				<input
					value={newUser.password}
					onChange={updateNewUser}
					type="password"
					placeholder="Password"
					name="password"

				/>
				<br />
				<button>Register</button>
			</form>
		</div>
	)
}

export default App