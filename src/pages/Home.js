import Content from "../components/Content";
import Header from "../components/Header";
import React, {useEffect, useState} from "react";
import {
    FaBars,
    FaChevronLeft,
    FaChevronRight,
    FaCross,
    FaCrow,
    FaFileAlt,
    FaMoon,
    FaRegFolder,
    FaSun
} from "react-icons/all";
import FolderService from "../service/FolderService";
import {Router} from "react-router-dom";
import Sidebar from "../components/nav/Sidebar";
import NotesService from "../service/NotesService";

const activeSide = "side ease-in-out w-96 transform-gpu transition-all_ fixed duration-700 flex justify-center p-2"
const hiddenSide = "side ease-in-out w-96 transform-gpu transition-all_ fixed duration-700  flex justify-center p-2 -translate-x-96"
const activeButton = "absolute w-10 h-10 bg-yellow -400 top-0 cursor-pointer transition-all_ transform duration-700 flex items-center justify-center"
const normalButton = "absolute w-10 h-10 bg-yellow -400 top-0 cursor-pointer transition-all_ transform duration-700 flex items-center justify-center "

function Home() {
    const [activeSidebar, setActiveSidebar] = useState(true)
    const [treeData, setTreeData] = useState([]);
    const [note, setNote] = useState([])
    const [folder, setFolder] = useState()
    const [clickedId, setClickedId] = useState()
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
        })();
    }, [])

    const noteClicked = (type, id) => {
        setClickedId(id);
        if (type === "note") {
            NotesService.get(id)
                .then((result) => {
                    setNote(result.data[0])
                    setFolder(result.data[0].folder_id)
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setFolder(id);
        }
    }
    return (
        <>
            {/* HEADER */}
            <div className={"ease-in-out transform-gpu transition-all duration-700"}>
                {/* HAMBURGER */}
                <div className={activeSidebar ? normalButton : activeButton}
                     onClick={() => setActiveSidebar(!activeSidebar)}>
                    {activeSidebar ? <FaChevronLeft/> : <FaBars/>}
                </div>
                <div className={"topbar flex-grow h-10"}>
                    <div className="flex-wrap overflow-hidden ">
                        <div className="flex-grow overflow-hidden ">
                            <div className={"flex justify-between"}>
                                <div className={""}>
                                    <div className={`transition-all duration-700 sidetop w-96 h-10 w-10 py-2 ${activeSidebar ? "" : "-ml-96"}`}>
                                        <div className={"flex justify-center items-center"}>
                                            <button className={"mx-2"}>
                                                <FaRegFolder className={"w-5 h-5 text-muted hover:text-hover-accent"}/>
                                            </button>
                                            <button className={"mx-2"}>
                                                <FaFileAlt className={"w-5 h-5 text-muted hover:text-hover-accent"}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={"flex items-center"}>
                                    {/*<div className={"mr-8 text-sm"}>Menu</div>*/}

                                    <div className="dropdown inline-block relative">
                                        <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                                            <span className="mr-1">Dropdown</span>
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                                        </button>
                                        <ul className="group-hover:block dropdown-menu absolute hidden text-gray-700 pt-1">
                                            <li className=""><a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">One</a></li>
                                            <li className=""><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Two</a></li>
                                            <li className=""><a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Three is the magic number</a></li>
                                        </ul>
                                    </div>


                                    <div className={""}>
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
            </div>
            {/*SIDEBAR */}
            <div className="sidebar transform relative transition-all duration-700 ">
                <div className={`${activeSidebar ? activeSide : hiddenSide}`}>
                    <Sidebar items={treeData} noteClicked={noteClicked} clicked_id={clickedId}/>
                </div>
            </div>
            {/*<Notes/>*/}
            <Content activeSidebar={activeSidebar} note={note}/>
        </>
    )
}

export default Home;