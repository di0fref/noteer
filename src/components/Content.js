import {useEffect, useState} from "react";
import {FaMoon, FaSun} from "react-icons/all";

function Content(props) {

    const [activeSidebar, setActiveSidebar] = useState(true)

    useEffect(() => {
        setActiveSidebar(props.activeSidebar)
    }, [props.activeSidebar])

    return (
        <>
        <div className={` ${props.activeSidebar ? "ml-80  " : ""} p-10 ease-in-out transform-gpu transition-all fixed duration-700 content flex-grow_ flex justify-center`}>

            <div className="flex items-center justify-center w-full mb-12">

                <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input type="checkbox" id="toggleB" className="sr-only"/>
                            <div className="block bg-gray-600 w-16 h-8 rounded-full flex items-center px-2 justify-between">
                                <FaSun className={"w-4"}/>
                                <FaMoon/>
                            </div>
                            <div className="dot absolute left-1 top-1 bg-black w-6 h-6 rounded-full transition opacity-50"></div>
                    </div>

                </label>

            </div>
         Content
            I have been working on a custom Ghost theme to power my blog (you are looking at an early version right
            now!). One thing I wanted to have a crack at was a dark/light theme switcher. It turns out with modern CSS
            this is pretty straight forward.

            The approaches I considered were:

            CSS classes set on the
            Switch out style sheet entirely
            CSS variables
            I went with CSS variables because my blog audience tends to be on the latest browser versions so I don't
            need to worry much about browser support (not that it is too bad).

            If a blog post is too much for you, I managed to condense it into 4 tweets:
        </div>
        </>
    )
}

export default Content