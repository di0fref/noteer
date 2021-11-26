import {FaBars} from "react-icons/all";
import Nav from "../components/Nav";

function Main() {
    return (
        <>
            <Nav/>
            <div className="sidebar flex flex-wrap overflow-hidden">

                <div className="w-80 overflow-hidden p-8">
                    <h6 className={"tracking-widest uppercase text-sm mb-4 text-muted"}>Notebooks</h6>
                    <ul className={"text-muted"}>
                        <li>
                            <a href="#" className={"hover:text-hover"}> Folder 1</a>
                        </li>
                        <li>Folder 2</li>
                    </ul>
                </div>

                <div className="content flex-grow overflow-hidden p-12">
                    Content
                </div>

            </div>
        </>
    )
}

export default Main;