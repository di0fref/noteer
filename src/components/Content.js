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
        <div
            className={` ${props.activeSidebar ? "ml-96  " : ""} p-10 ease-in-out transform-gpu transition-all fixed duration-700 content flex-grow_ flex justify-center`}>





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
            {note
            ? note.text
            : ""}

        </div>
        </>
    )
}

export default Content