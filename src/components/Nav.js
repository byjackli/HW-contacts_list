import { NavLink } from "react-router-dom"
import Icon from "./Icon"

function Nav() {

    return <nav>
        <div>
            <NavLink to="/"><Icon art="home" title="Home" /></NavLink>
            <div>
                <NavLink to="/my-card"><Icon art="account_circle" title="My Card" /></NavLink>
                <NavLink aria-label="create a new contact" to="/new"><Icon art="person_add" title="New Contact" /></NavLink>
            </div>
        </div>
        <div>
            <NavLink to="/help"><Icon art="help" title="Help" /></NavLink>
            <NavLink to="/settings"><Icon art="settings" title="Settings" /></NavLink>
        </div>
    </nav>
}

export default Nav