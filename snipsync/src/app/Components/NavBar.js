import { Link } from "react-router-dom"
import stlyes from '../page.module.css'

export function NavBar() {
    return (
        <test className={stlyes.test}>
        <div className={stlyes.buttons}>
                <Link to="/">
                    <input type="button" value="Home Page"/>
                </Link>
                <Link to="/page1">
                    <input type="button" value="Page 1"/>
                </Link>
                <Link to="/page2">
                    <input type="button" value="Page 2"/>
                </Link>
        </div>
        </test>
     
    )
}