import {useEffect, useState} from "react";
import {FaBars, FaChevronLeft, FaChevronRight, FaCross, FaCrow} from "react-icons/all";
import FolderService from "../service/FolderService";

function SideMenu(props) {

    const [folders, setFolders] = useState([])

    useEffect(() => {
        FolderService.getAll()
            .then((result) => {
                setFolders(result.data)
            })
    }, [])

    // console.log(folders);
    return (
        <ul>
            {folders.map((folder) => {
                return(
                    <li>{folder.name}</li>
                )
            })}
        </ul>
    )
}

export default SideMenu