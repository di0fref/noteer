import Content from "../components/Content";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import {FaBars, FaChevronLeft, FaChevronRight, FaCross, FaCrow, FaMoon, FaSun} from "react-icons/all";
import FolderService from "../service/FolderService";
import {Router} from "react-router-dom";
import Sidebar from "../components/nav/Sidebar";
import NotesService from "../service/NotesService";

const activeSide = "side ease-in-out w-96 transform-gpu transition-all_ fixed duration-700 flex justify-center p-2"
const hiddenSide = "side ease-in-out w-96 transform-gpu transition-all_ fixed duration-700  flex justify-center p-2 -translate-x-96"
const activeButton = "absolute w-10 h-10 bg-yellow -400 top-0 cursor-pointer transition-all_ transform duration-700 flex items-center justify-center"
const normalButton = "absolute w-10 h-10 bg-yellow -400 top-0 cursor-pointer transition-all_ transform duration-700 flex items-center justify-center -translate-x-92"

function Home() {
    const [activeSidebar, setActiveSidebar] = useState(true)
    const [treeData, setTreeData] = useState([]);
    const [note, setNote] = useState([])
    // /**************************************** */
    // const fetchJson = (url) => fetch(url).then((r) => r.json());
    //
    // const getResult = (parent) =>
    //     fetchJson(`http://localhost:4000/folders/byparent/${parent}`).then(
    //         (children) => Promise.all(children.map(getResultAux))
    //     );
    //
    // const getResultAux = async (t = {}) => ({
    //     ...t,
    //     children: await getResult(t.id),
    // });
    // /******************************************* */
    useEffect(() => {
        (async () => {
            let response = await FolderService.getResult(0);
            setTreeData(response);
            console.log(response)
        })();
    }, [])

    const noteClicked = (type, id) => {
        NotesService.get(id)
            .then((result) => {
                setNote(result.data[0])
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            {/* HEADER */}
            <div className={"header flex justify-between ease-in-out transform-gpu transition-all duration-700 "}>
                {/* HAMBURGER */}
                <div className={"sidetop w-96 h-10 w-10"}>
                    <div className={activeSidebar ? normalButton : activeButton}
                         onClick={() => setActiveSidebar(!activeSidebar)}
                    >
                        {activeSidebar ? <FaChevronLeft/> : <FaBars/>}
                    </div>
                </div>
                <div className={"topbar flex-grow h-10"}>
                    <div className="flex flex-wrap overflow-hidden ">
                        <div className="flex-grow overflow-hidden ">
                            <div className={"flex justify-between"}>
                                <div className={"py-2"}></div>
                                <div className={"py-2 mx-4"}>
                                    <button id="theme-toggle" className="" type="button">
                                        <span className="d-block-light d-none hover:text-hover"><FaMoon/></span>
                                        <span className="d-block-dark d-none hover:bg-hover"><FaSun/></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*SIDEBAR */}
            <div className="sidebar transform relative transition-all duration-700 ">
                <div className={`${activeSidebar ? activeSide : hiddenSide}`}>
                    <Sidebar items={treeData} noteClicked={noteClicked} clicked_id={note.id}/>
                </div>
            </div>
            {/*<Notes/>*/}
            <Content activeSidebar={activeSidebar} note={note}/>
        </>
    )
}

export default Home;