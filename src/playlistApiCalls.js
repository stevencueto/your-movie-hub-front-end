const token = localStorage.getItem('token')

const newPlaylist = async (newPlaylist)  => {
    e.preventDefault()
    try{
        const loginRequest = await fetch(`https://yourmoviehubapi.herokuapp.com/playlist/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "withCredentials": true
            },
            body: JSON.stringify(possibleUser),
        })
        const loginResponse = await loginRequest.json()
        if (loginResponse.success) {
            localStorage.setItem('token', loginResponse.data)
            setPossibleUser({
                email: '',
                password: ''
            })
            alert('Login successful')
            window.location.reload(false);
            navigate("/", { replace: true });
        } else if(loginResponse.data === "Wrong Password"){
            setErrMessage("Sorry, your password was incorrect. Please double-check your password.")
            errPassword.current.focus()
        }else if (loginResponse.data === "No Matching Credentials in The DBS"){
            loginRef.current.focus()
            setErrMessage(loginResponse.data)
        }
    }catch(err){
        console.log(err)
        setErrMessage('Failed to communite with server')
    }
    
}