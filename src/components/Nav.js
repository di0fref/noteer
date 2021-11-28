import {FaFolder, FaMoon, FaNode, FaRegFile, FaRegFolder, FaSearch, FaSun} from "react-icons/all";

function Nav() {
    return (
        <nav className="he ader h-10">
            <div className="flex flex-wrap overflow-hidden ">
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