import { Link } from "react-router-dom"
const NaviBar = () => {
    return(
        <div>
            <nav className="navbar">
                <ul className="main-nav">
                    <li>Home</li>
                    <li>Friends</li>
                    <li>Your Profile</li>
                </ul>
                <ul className="logout">
                    <li>Logout</li>
                </ul>
            </nav>
        </div>
    )
}

export default NaviBar