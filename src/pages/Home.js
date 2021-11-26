import Content from "../components/Content";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import {useState} from "react";
import {FaBars, FaChevronLeft, FaChevronRight, FaCross, FaCrow} from "react-icons/all";

const activeSide = "bg-gray-800 h-screen w-80 transform transition-all fixed duration-700 text-white flex justify-center p-2"
const hiddenSide = "bg-gray-800 h-screen w-80 transform transition-all fixed duration-700 text-white flex justify-center p-2 -translate-x-80"
const activeButton = "absolute w-10 h-10 bg-yellow -400 top-0 cursor-pointer transition-all transform duration-700 flex items-center justify-center"
const normalButton = "absolute w-10 h-10 bg-yellow -400 top-0 cursor-pointer transition-all transform duration-700 flex items-center justify-center translate-x-72"

function Home() {
    const [activeSidebar, setActiveSidebar] = useState(true)

    return (
        <>
            {/* HEADER */}
            <div className={"flex justify-between"}>
                {/* HAMBURGER */}
                <div className={"w-80 bg-gray-200 h-10 w-10"}>
                    <div className={activeSidebar ? normalButton : activeButton}
                         onClick={() => setActiveSidebar(!setActiveSidebar)}
                    >
                        {setActiveSidebar ? <FaChevronLeft/> : <FaBars/>}
                    </div>
                </div>
                <div className={"flex-grow bg-gray-300 h-10"}>TOPBAR</div>
            </div>
            {/*SIDEBAR */}
            <div className="w-screen h-screen flex transform relative transition-all duration-1000">
                <div className={activeSidebar ? activeSide : hiddenSide}>
                    <SideMenu/>
                </div>
                <Content/>
            </div>
        </>
    )
}

export default Home;