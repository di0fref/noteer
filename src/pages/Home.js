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
import {Router, useParams} from "react-router-dom";
import Sidebar from "../components/nav/Sidebar";
import NotesService from "../service/NotesService";
import Dropdown from "../components/Dropdown";
import {ListItem, ListItemText, Modal, Tooltip} from "@mui/material";
import ReactDOM from "react-dom";
import useUrl from "../components/hooks/useUrl";

const activeSide = "noprint  side ease-in-out w-96 transform-gpu transition-all fixed duration-700 flex justify-center p-2"
const hiddenSide = "noprint side ease-in-out w-96 transform-gpu transition-all fixed duration-700  flex justify-center p-2 -translate-x-96"
const activeButton = "noprint absolute w-10 h-10 bg-yellow -400 top-0 cursor-pointer transition-all transform duration-700 flex items-center justify-center"
const normalButton = "noprint absolute w-10 h-10 bg-yellow -400 top-0 cursor-pointer transition-all transform duration-700 flex items-center justify-center "


function Home(props) {

    const [activeSidebar, setActiveSidebar] = useState(true)
    const [treeData, setTreeData] = useState([]);
    const [note, setNote] = useState([])
    const [folder, setFolder] = useState()
    const [clickedId, setClickedId] = useState()
    const [mobileView, setMobileView] = useState(false)
    const [dropped, setDropped] = useState(false);
    const [bookMarks, setBookMarks] = useState([]);
    const [bookMarked, setBookMarked] = useState(false)
    const [noteCreated, setNoteCreated] = useState(false)
    let params = useParams();

    /* Modal */
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        (async () => {
            let response = await FolderService.getResult(0);
            let notesWithoutFolder = await FolderService.notesByFolderId(0);
            let bookmarks = await NotesService.getBookMarks();
            setBookMarks(bookmarks.data)
            setTreeData(response.concat(notesWithoutFolder.data));
            setDropped(false);
            setBookMarked(false);
            setNoteCreated(false)
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
        // var toggle = document.getElementById("theme-toggle");
        //
        // var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        // if (storedTheme)
        //     document.documentElement.setAttribute('data-theme', storedTheme)
        //
        //
        // toggle.onclick = function() {
        //     var currentTheme = document.documentElement.getAttribute("data-theme");
        //     var targetTheme = "light";
        //
        //     if (currentTheme === "light") {
        //         targetTheme = "dark";
        //     }
        //
        //     document.documentElement.setAttribute('data-theme', targetTheme)
        //     localStorage.setItem('theme', targetTheme);
        // };

    }, [dropped, bookMarked, noteCreated])

    const droppedHandler = () => {
        setDropped(true);
    }
    useUrl((type, id) => {
        noteClicked(type, id)
    }, [params])

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

    const createFolder = (parent_id) => {

    }

    function uuidv4() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    const createNote = (e) => {
        let id = uuidv4()
        NotesService.create({
            id: id,
            name: "Untitled",
            folder_id: folder || 0,
            text: ""
        }).then((result) => {
            NotesService.get(id).then((result) => {
                setNote(result.data[0])
                setNoteCreated(true);
                setClickedId(id);
            })
        })
    }
    const setBookMark = (note) => {
        note.bookmark = !note.bookmark
        NotesService.update(note.id, note).then((result) => {
            NotesService.get(note.id).then((result) => {
                setNote(result.data[0])
                setBookMarked(true);
            })
        })
    }
    return (
        <>
            {/* HEADER */}
            {/*<div className={"head noprint ease-in-out transform-gpu transition-all _fixed duration-70"}>*/}
            {/*    /!* HAMBURGER *!/*/}
            {/*    <div className={activeSidebar ? normalButton : activeButton}*/}
            {/*         onClick={toggleSidebar}>*/}
            {/*        {activeSidebar ? <FaChevronLeft/> : <FaBars/>}*/}
            {/*    </div>*/}
            {/*    <div className={"topbar noprint flex-grow h-10"}>*/}
            {/*        <div className="flex-wrap overflow-hidden ">*/}
            {/*            <div className="flex-grow overflow-hidden ">*/}
            {/*                <div className={"flex justify-between"}>*/}
            {/*                    <div className={""}>*/}
            {/*                        <div className={`transition-all duration-700 sidetop w-96 h-10 w-10 py-2 ${activeSidebar ? "" : "-ml-96"}`}>*/}
            {/*                            <div className={"flex justify-center items-center"}>*/}
            {/*                                <Tooltip title={"New Folder"}>*/}
            {/*                                    <button className={"mx-2"}>*/}
            {/*                                        <FaRegFolder className={"w-5 h-5 text-muted hover:text-hover-accent"}/>*/}
            {/*                                    </button>*/}
            {/*                                </Tooltip>*/}
            {/*                                <Tooltip title={"New Note"} onClick={createNote}>*/}
            {/*                                    <button className={"mx-2"}>*/}
            {/*                                        <FaFileAlt className={"w-5 h-5 text-muted hover:text-hover-accent"}/>*/}
            {/*                                    </button>*/}
            {/*                                </Tooltip>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className={"flex items-center"}>*/}
            {/*                        <div className={"mr-4"}>*/}
            {/*                            <button id="theme-toggle" className="" type="button">*/}
            {/*                                <span className="d-block-light d-none hover:text-hover-accent"><FaMoon/></span>*/}
            {/*                                <span className="d-block-dark d-none hover:text-hover-accent"><FaSun/></span>*/}
            {/*                            </button>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*SIDEBAR */}
            <div className="sidebar noprint transform relative transition-all duration-700 ">
                <div className={`${activeSidebar ? activeSide : hiddenSide}`}>
                    <Sidebar
                        toggleSidebar={toggleSidebar}
                        mobileView={mobileView}
                        createNote={createNote} note_id={note.id} items={treeData} noteClicked={noteClicked} clicked_id={clickedId} droppedHandler={droppedHandler} bookmarks={bookMarks}/>
                </div>
            </div>
            <Content
                noteClicked={noteClicked}
                activeSidebar={activeSidebar}
                normalButton={normalButton}
                activeButton={activeButton}
                activeSide={activeSide}
                hiddenSide={hiddenSide}
                toggleSidebar={toggleSidebar}
                note={note}
                setBookMark={setBookMark}/>
        </>
    )
}

export default Home;