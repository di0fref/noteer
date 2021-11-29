import {useEffect, useState} from "react";
import {FaMoon, FaSun} from "react-icons/all";

function Content(props) {

    // const [activeSidebar, setActiveSidebar] = useState(true)
    const [note, setNote] = useState(false)

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

            <div className={` ${props.activeSidebar ? "ml-96  " : ""}  ease-in-out transform-gpu transition-all  duration-700 content `}>
                <div className={"note-content flex flex-col"}>
                    <div className={"content-header h-10 flex-grow px-6 py-2"}>
                        {note.name}
                    </div>
                    <div className={"p-6 flex-grow"}>
                        {note
                            ? note.text
                            : ""}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content