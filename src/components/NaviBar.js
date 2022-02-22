import { Link } from "react-router-dom"
import AddNewUser from "./AddNewUser"
import Cookies from "cookies-js"

const NaviBar = ({user, setUser}) => {
    function handleLogout(){
        setUser(undefined)
        Cookies.set('user', undefined)
    }
    return(
        <div className="navContainer">
            <nav className="navbar">
                <ul className="main-nav">
                        <li><Link to="/">Home</Link></li>
                        {!user && <li><Link to="/newuser">Sign Up</Link></li>}
                        {user && <li><Link to="/yourprofile">Your Profile</Link></li>}
                </ul>
                {user && <ul className="logout">
                    <li onClick={()=> handleLogout()} ><Link to="/">Logout</Link></li>
                </ul>}
            </nav>
        </div>
    )
}

export default NaviBar