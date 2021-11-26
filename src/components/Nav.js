import {FaFolder, FaMoon, FaNode, FaRegFile, FaRegFolder, FaSearch, FaSun} from "react-icons/all";

function Nav() {
    return (
        <nav className="header h-10">
            <div className="flex flex-wrap overflow-hidden ">

                <div className="w-80 overflow-hidden flex justify-center items-center py-2">
                    <span className={"mx-2"}>
                        <FaRegFile className={"w-5 h-5 icon"}/>
                    </span>
                    <span className={"mx-2"}>
                        <FaRegFolder className={"w-5 h-5 icon"}/>
                    </span>
                </div>

                <div className="flex-grow overflow-hidden ">
                    <div className={"flex justify-between"}>
                        <div className={"py-2"}>Kalle</div>
                        <div className={"py-2 mx-4"}>
                            <button id="theme-toggle" className="" type="button">
                                <span className="d-block-light d-none hover:text-hover"><FaMoon/></span>
                                <span className="d-block-dark d-none hover:bg-hover"><FaSun/></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;