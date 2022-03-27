import { useState, useEffect } from 'react'
import * as jose from 'jose'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	let navigate = useNavigate();

    const [possibleUser, setPossibleUser] = useState({
        email: '',
        password: ''
    })
    const  updatePossibleUser = (e) => {
        const {name, value, type, checked} = e.target
        setPossibleUser(prev => {
            return {
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

	const loginUser = async(e) => {
		e.preventDefault()
		console.log(e)
		try{
			console.log("try?")
			const loginRequest = await fetch('http://localhost:3001/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					"withCredentials": true
				},
				body: JSON.stringify(possibleUser),
			})
			console.log(loginRequest)
			const loginResponse = await loginRequest.json()
			if (loginResponse.success) {
				localStorage.setItem('token', loginResponse.data)
				setPossibleUser({
					email: '',
					password: ''
				})
				alert('Login successful')
				navigate("/", { replace: true });
			} else {
				alert(loginResponse.data)
			}
			console.log(loginResponse)
		}catch(err){
			console.log(err)
			alert("Internal Server error")
		}
		
	}
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) navigate("/", { replace: true });
	}, [])

	return (
		<section>
			<h1>Login</h1>
			<form onSubmit={(e) => loginUser(e)}>
                <input
					value={possibleUser.email}
					onChange={(e) => updatePossibleUser(e)}
					type="email"
					placeholder="Email"
                    name="email"
                    required
				/>
				<br />
				<input
					value={possibleUser.password}
					onChange={(e) => updatePossibleUser(e)}
					type="password"
					placeholder="Password"
                    name="password"
                    required
				/>
				<br />
				<button type="submit" >login</button>
			</form>
		</section>
	)
}

export default Login