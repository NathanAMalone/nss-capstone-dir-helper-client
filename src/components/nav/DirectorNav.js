import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const DirectorNav = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__item">
            <Link className="nav-link" to="/instruments">Instruments</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/music">Music</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/uniforms">Uniforms</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/props">Props</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/students">All Students</Link>
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