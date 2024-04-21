import { useEffect, useState } from "react";
import styles from "../page.module.css";

export function TwitchPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=> {
        const loggedIn = localStorage.getItem("LoggedIn");

        if(loggedIn === "false"){
            setIsAuthenticated(false);
        }

    }, [])
    return (
        
        <main className={styles.main}>
            <div className={styles.description}>
                <h1>Page1</h1>
            </div>
        </main>
    )
}
