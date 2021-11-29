import {FaBars, FaChevronLeft, FaChevronRight, FaCross, FaCrow, FaMoon, FaSun} from "react-icons/all";

function Avatar() {
    return (
        <div>


            <div className="sidebar-avatar leading-none flex justify-center items-center">
                <div className="">
                    <a href="#" className="l">
                        <div className="avatar w-12 h-12 mr-2">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="Avatar" className="rounded-full p-1 bg-darker border-1"/>
                        </div>
                    </a>
                </div>
                <div className="mb-1 flex-grow">
                    <p>Fredrik Fahlstad</p>
                    <p className="text-muted text-sm">Senior Developer</p>
                </div>
                <div className={""}>
                    {/*<button id="theme-toggle" className="s" type="button">*/}
                    {/*    <span className="d-block-light d-none hover:text-hover-accent"><FaMoon/></span>*/}
                    {/*    <span className="d-block-dark d-none hover:text-hover-accent"><FaSun/></span>*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    )
}

export default Avatar