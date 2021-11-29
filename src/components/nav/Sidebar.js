import React, {useEffect, useState} from 'react'
import {List, ListItem, ListItemText, Collapse, ListItemIcon} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {FaFile, FaFileAlt, FaRegFolder, FaRegFolderOpen, FaStar, FaTrash, FaTrashAlt} from "react-icons/all";
import FolderService from "../../service/FolderService";
import Avatar from "../Avatar";
import SearchInput from "../SearchInput";

function SidebarItem(props) {

    const [open, setOpen] = useState(false); // Open or closed sidebar menu

    const handleClick = (type, id) => {
        setOpen(!open);
        if (type === "note") {
            props.noteClicked(type, id)
        }
    };

    useEffect(() => {

    }, [props.clicked_id])


    return (
        <div key={`aa-${props.items.id}`} id={`aa-${props.items.id}`}>
            <ListItem button dense
                      onClick={() => {
                          handleClick(props.items.type, props.items.id);
                      }}
                      key={`bb-${props.items.id}`}
                      selected={
                          (props.items.id === props.clicked_id) ? true : false
                      }

            >
                <ListItemText style={{paddingLeft: props.depth * props.depthStep * 3}} key={`cc-${props.items.id}`}>
                    <div className={'flex justify-start items-center'}>
                        <div>
                            {props.items.type == "folder"
                                ? <FaRegFolder className={`icon`}/>
                                : <FaFileAlt className={`icon`}/>
                            }
                        </div>
                        <div className={"ml-2"}>{props.items.label}</div>
                    </div>
                </ListItemText>
                {(props.items.items && props.items.items.length > 0)
                    ? open ? <ExpandLess/> : <ExpandMore/>
                    : null}
                {/*<span className={`text-sm text-muted`}>{count}</span>*/}
            </ListItem>
            {(props.items.items && props.items.items.length > 0) ? (
                <div key={`er-${props.items.id}`}>
                    <Collapse in={open} timeout="auto" unmountOnExit key={`ee-${props.items.id}`}>
                        <List disablePadding dense
                              key={`ff-${props.items.id}`}>
                            {props.items.items.map((subItem, index) => (
                                <div key={`ok-${index}`}>
                                    <SidebarItem
                                        key={`${subItem.name}${index}`}
                                        depth={props.depth + 1}
                                        depthStep={props.depthStep}
                                        items={subItem}
                                        noteClicked={props.noteClicked}
                                        clicked_id={props.clicked_id}
                                    />
                                </div>
                            ))}
                        </List>
                    </Collapse>
                </div>
            ) : null}
        </div>
    )
}

function Sidebar(props) {
    return (
        <div className="flex-grow">
            <div className={"mx-4 mt-6"}>
                <Avatar/>
            </div>
            {/*<div className={"search mx-4 mt-6"}>*/}
            {/*    <input type={"text"} className={"w-full bg-primary p-2 rounded rounded-lg"} placeholder={"Search"}/>*/}
            {/*</div>*/}
            <SearchInput/>
            <h3 className={`text-xs pl-4 text-muted uppercase tracking-widest font-bold mb-2 mt-6`}>Bookmarks</h3>
            <div className={"flex justify-start items-center ml-4 text-sm"}>
                <div><FaStar className={"icon text-accent"}/></div>
                <div className={"ml-2"}>Bookmark 1</div>
            </div>
            <h3 className={`text-xs pl-4 text-muted uppercase tracking-widest font-bold mb-2 mt-6`}>Notebooks</h3>

            <List disablePadding dense key={props.depthStep}>
                {props.items.map((sidebarItem, index) => (
                    <div key={index}>
                        <SidebarItem
                            key={`${sidebarItem.name}${index}`}
                            depthStep={10}
                            depth={0}
                            noteClicked={props.noteClicked}
                            items={sidebarItem}
                            clicked_id={props.clicked_id}
                        />
                    </div>
                ))}
            </List>
            <div className={"trash flex justify-start items-center text-sm ml-4 mt-14"}>
                <div><FaTrashAlt className={"icon"}/></div>
                <div className={"ml-2"}>Trash</div>
            </div>
        </div>
    )
}

export default Sidebar