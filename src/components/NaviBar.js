import { Link } from "react-router-dom"
import AddNewUser from "./AddNewUser"

const NaviBar = ({user, setUser}) => {
    return(
        <div className="navContainer">
            <nav className="navbar">
                <ul className="main-nav">
                        <li><Link to="/">Home</Link></li>
                        {!user && <li><Link to="/newuser">Sign Up</Link></li>}
                        {user && <li><Link to="/yourprofile">Your Profile</Link></li>}
                </ul>
                {user && <ul className="logout">
                    <li onClick={()=> setUser(undefined)} ><Link to="/">Logout</Link></li>
                </ul>}
            </nav>
        </div>
    )
}

export default NaviBar