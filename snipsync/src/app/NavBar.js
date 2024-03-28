import { Link } from "react-router-dom"


export function NavBar() {
    return (
        <>
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/page1">
                <button>Page1</button>
            </Link>
            <Link to="/page2">
                <button>Page2</button>
            </Link>

        </>
    )
}