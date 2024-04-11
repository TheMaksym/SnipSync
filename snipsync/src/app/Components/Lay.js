import { NavBar } from "./NavBar"
import { Outlet } from "react-router-dom"


export function Lay() {
    return (
        <>
            <NavBar/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}