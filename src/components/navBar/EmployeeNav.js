import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/review">Review</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/posts">Community Posts</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/resources">Community Resources</Link>
            </li>

            {/* logout button link (between curly brackets) */}
            {
                localStorage.getItem("reconnect_user")
                    ? <li className="navbar__item navbar__logout">
                        {/* key element that creates the hyperlink for us. the onClick event is set to remove the "honey_user" item when logout is clicked. then it navigates user back to the base route of the application*/}
                        <Link className="navbar__link" to="" onClick={() => {

                        // the onClick event is set to remove the "honey_user" item when logout is clicked.
                            localStorage.removeItem("reconnect_user")

                            // then it navigates user back to the base route of the application
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}