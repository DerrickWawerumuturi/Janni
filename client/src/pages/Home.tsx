import '../index.css'
import Navbar from "../components/Navbar.tsx";
import Hero from '../components/Hero.tsx'


const Home = () => {
    return (
        <div className={"flex w-full flex-col sm:gap-10 lg:gap-20"}>
            <Navbar/>
            <Hero />
        </div>

    )
}

export default Home
