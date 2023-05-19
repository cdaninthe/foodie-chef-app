import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";


function NavBar(){

    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        fetch('/logout', {
            method: "DELETE"
        }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        }).then(<redirect to="/" />)
    }

    return (
        <div>
            <h3 className="nav">Hello {user.username} | 
            <NavLink exact to="/"> Recipes |</NavLink>
            <NavLink exact to="/account">  My Account  |</NavLink>
            <span onClick={handleLogout}> Log Out</span>
            </h3>
        </div>
    );
}

export default NavBar;