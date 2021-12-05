import React, {useEffect, useState} from "react";
import {FaMoon, FaStar, FaSun} from "react-icons/all";
import Dropdown from "./Dropdown";
import NotesService from "../service/NotesService";
import {Tooltip} from "@mui/material";
import Editor from "./Editor.tsx";
import ReplaceContentImperative from "./Editor.tsx";
function Content(props) {

    const [note, setNote] = useState(props.note)


    useEffect(() => {
        setNote(props.note)
    }, [props.note])
    return (

        <>
            {/*<div className={"flex items-center ml-96"}>*/}
            {/*    <div className={"bg-primary w-20 h-20"}>primary</div>*/}
            {/*    <div className={"bg-secondary w-20 h-20"}>secondary</div>*/}
            {/*    <div className={"bg-primary-alt w-20 h-20"}>primary-alt</div>*/}
            {/*    <div className={"bg-secondary-alt w-20 h-20"}>secondary-alt</div>*/}
            {/*</div>*/}

            {/*<div className="flex items-center justify-center w-full mb-12">*/}
            {/*<label htmlFor="toggleB" className="flex items-center cursor-pointer">*/}
            {/*    <div className="relative">*/}
            {/*        <input type="checkbox" id="toggleB" className="sr-only"/>*/}
            {/*            <div className="block bg-accent w-16 h-8 rounded-full flex items-center px-2 justify-between">*/}
            {/*                <FaSun className={"w-4"}/>*/}
            {/*                <FaMoon/>*/}
            {/*            </div>*/}
            {/*            <div className="dot absolute left-1 top-1 bg-black w-6 h-6 rounded-full transition opacity-50"></div>*/}
            {/*    </div>*/}
            {/*</label>*/}
            {/*</div>*/}

            <div className={` ${props.activeSidebar ? "ml-96 hidden md:block print:block" : ""}  ease-in-out transform-gpu transition-all duration-700 content -m t-10`}>
                <div className={"note-content flex flex-col"}>
                    <div className={"content-header flex-grow px-6 mt-1"}>
                        <div className={"flex justify-start items-center "}>

                            {note
                                ? (
                                    <>
                                        <Tooltip title={`${note.bookmark ? "Remove Bookmark" : "Set Bookmark"}`}>
                                            <button onClick={() => props.setBookMark(note)} >
                                                <FaStar className={` noprint icon ${note.bookmark ? "text-accent" : null}`}/>
                                            </button>
                                        </Tooltip>
                                        <div className={"ml-2 font-semibold"}>
                                            Customers / {note.name}
                                        </div>
                                    </>
                                )
                                : (null)
                            }

                        </div>
                    </div>
                    <div className={"p-6 flex-grow text-base"}>

                        {note
                            ?
                        <ReplaceContentImperative note={note}/>
                            : ""}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Content