import React, {useState} from "react";

function SignUpForm({handleLoginClick, onLogin}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState([])

    const handleSignup = (e) => {
        e.preventDefault()
        setErrors([]);

        fetch('/signup', {
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
            })
        }).then((r) => {
            if (r.ok) {
              r.json().then((user) => onLogin(user));
            } else {
              r.json().then((err) => setErrors(err.errors));
            //   r.json().then((err) => console.log(err.errors));
            }
          });
    }


    return (
        <div>
            <form onSubmit={handleSignup}>
                <h2>Create an Account</h2>
                <br />
                <label>Username: </label><br />
                <input type="text" name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br /><br />
                <label>Password (8 characters minimum): </label><br />
                <input type="password" name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />
                <label>Password Confirmation: </label><br />
                <input type="password" name="password-confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <br /><br />
                {
                    errors ? 
                        <div>
                            {errors.map((err) => (
                                <div className="error-message" key={err}>{err}</div>
                            ))}
                        </div> 
                    : null 
                }                
                <br />
                <button>SIGN UP</button>
                <br /><br />
                <p>Already have an account?  <a className="App-link" onClick={handleLoginClick}>Sign In</a></p>
            </form>
        </div>
    );
  }
  
  export default SignUpForm;