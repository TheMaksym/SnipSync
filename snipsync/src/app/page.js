
import Image from "next/image";
import Navbar from "../components/Navbar";
import styles from "./Home.module.css";

export default function Home() {
  const { push } = useRouter();
  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated") === "true";
    if (authenticated) {
      push("/dashboard");
    }
  });

  return (
    <>

      <Navbar isUserAuthenticated={false} activeLink="" />

      <div className={styles.main}>

        <Image
          src="/images/SnipSyncLogo.png"
          alt="Logo"
          width={200}
          height={200}
        />

        <div className={styles.buttonBox}>

          <a href="/login" className={styles.login}>Log In</a>
          <a href="/signup" className={styles.signup}>Sign Up</a>
        </div>
      </div>
    </>
  );
}