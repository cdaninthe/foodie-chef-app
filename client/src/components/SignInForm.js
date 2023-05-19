import React, {useState} from "react";

function SignInForm({handleLoginClick, onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const handleSignIn = (e) => {
        e.preventDefault()

        fetch('/login', {
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify({ username, password })
        }).then(res => {
            if(res.ok){
                res.json().then((user) => {
                    onLogin(user)
                })
            } else{
                res.json().then((err) => setError(`${Object.keys(err)}: ${Object.values(err)}`))
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSignIn}>
                <h2>Welcome Back!</h2>
                <br />
                <label>Username: </label><br />
                <input type="text" name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br /><br />
                <label>Password: </label><br />
                <input type="password" name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />
                {
                    error ? 
                    <div>
                        <div className="error-message">{error}</div>
                    </div> 
                    : null 
                }
                 <br />
                <button>SIGN IN</button>
                <br /><br />
                <p>Don't have an account yet?  <a className="App-link" onClick={handleLoginClick}>Sign Up</a></p>
            </form>
        </div>
    );
  }
  
  export default SignInForm;