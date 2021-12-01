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
import Dropdown from "../components/Dropdown";

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
    const [mobileView, setMobileView] = useState(false)

    useEffect(() => {
        (async () => {
            let response = await FolderService.getResult(0);
            let notesWithoutFolder = await FolderService.notesByFolderId(0);
            setTreeData(response.concat(notesWithoutFolder.data));
            // console.log(treeData)
        })();

        function handleResize() {
            if (!mobileView && document.documentElement.clientWidth < 767.98) {
                setMobileView(true)
                setActiveSidebar(false)
            } else {
                setMobileView(false)
                setActiveSidebar(true)
            }
        }

        window.addEventListener('resize', handleResize)

    }, [])

    const noteClicked = (type, id) => {
        setClickedId(id);
        if (type === "note") {
            NotesService.get(id)
                .then((result) => {
                    setNote(result.data[0])
                    setFolder(result.data[0].folder_id)
                    if (mobileView) {
                        setActiveSidebar(false)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setFolder(id);
        }
    }

    const toggleSidebar = () => {
        setActiveSidebar(!activeSidebar);
    }
    return (
        <>
            {/* HEADER */}
            <div className={"ease-in-out transform-gpu transition-all duration-700"}>
                {/* HAMBURGER */}
                <div className={activeSidebar ? normalButton : activeButton}
                     onClick={toggleSidebar}>
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

                                    {/*<div className={""}>*/}
                                    {/*    <Dropdown values={[*/}
                                    {/*        {*/}
                                    {/*            label: "Profile",*/}
                                    {/*            value: "profile"*/}
                                    {/*        },*/}
                                    {/*        {*/}
                                    {/*            label: "Sign out",*/}
                                    {/*            value: "logoff"*/}
                                    {/*        }*/}
                                    {/*    ]}/>*/}
                                    {/*</div>*/}
                                    <div className={"mr-4"}>
                                        <button id="theme-toggle" className="" type="button">
                                            <span className="d-block-light d-none hover:text-hover-accent"><FaMoon/></span>
                                            <span className="d-block-dark d-none hover:text-hover-accent"><FaSun/></span>
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