import React from "react";
import { NavLink } from "react-router-dom";


function NavBar(){

    return (
        <div>
            <h3 className="nav">Hello user.username | 
            <NavLink exact to="/"> Recipes |</NavLink>
            <NavLink exact to="/account">  My Account  |</NavLink>
            <span> Log Out</span>
            </h3>
        </div>
    );
}

export default NavBar;