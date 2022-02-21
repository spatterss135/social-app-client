import { Link } from "react-router-dom"

const NaviBar = () => {
    return(
        <div className="navContainer">
            <nav className="navbar">
                <ul className="main-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/friend">Friends</Link></li>
                        <li><Link to="/yourprofile">Your Profile</Link></li>
                </ul>
                <ul className="logout">
                    <li>Logout</li>
                </ul>
            </nav>
        </div>
    )
}

export default NaviBar