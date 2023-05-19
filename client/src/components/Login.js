import React, {useState} from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Card } from "semantic-ui-react";


function Login({onLogin}){
    const [showLogin, setShowLogin] = useState(true)

    function handleLoginClick(){
        setShowLogin(!showLogin)
    }

    return(
        <div>
             <Card fluid>
                <Card.Content>
                    <Card.Description>
                        {showLogin ? <SignInForm  handleLoginClick={handleLoginClick} onLogin={onLogin}/> 
                            : <SignUpForm handleLoginClick={handleLoginClick} onLogin={onLogin}/>
                        }
                    </Card.Description>
                </Card.Content>   
            </Card>
        </div>  
    );
}

export default Login;