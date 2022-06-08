import { NavLink } from "react-router-dom"
import Icon from "./Icon"

function Nav() {

    return <nav>
        <NavLink to="/"><Icon art="home" title="Home" /></NavLink>
        <NavLink to="/my-card"><Icon art="account_circle" title="My Card" /></NavLink>
        <NavLink to="/new"><Icon art="person_add" title="New Contact" /></NavLink>
        <NavLink to="/help"><Icon art="help" title="Help" /></NavLink>
        <NavLink to="/settings"><Icon art="settings" title="Settings" /></NavLink>
        <div className="cursor"></div>
    </nav>
}

export default Nav