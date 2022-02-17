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
            <h1>This is the nav bar</h1>
        </div>
    )
}

export default NaviBar