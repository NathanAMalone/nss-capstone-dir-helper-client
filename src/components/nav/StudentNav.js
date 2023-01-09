import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const StudentNav = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__item">
            <Link className="nav-link" to="/students">Your Profile</Link>
            </li>
           
            {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                localStorage.removeItem("user")
                                navigate('/login', {replace: true})
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}