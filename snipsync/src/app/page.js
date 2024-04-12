import Image from "next/image";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <>
    
    <Navbar isUserAuthenticated={false} activeLink="dashboard" />
    <Navbar isUserAuthenticated={false} activeLink="players" />
    <p>Hello World</p>

    </>
  );
}
