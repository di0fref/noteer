import React, {useState} from 'react'
import {List, ListItem, ListItemText, Collapse, ListItemIcon} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {FaFile, FaFileAlt, FaRegFolder, FaRegFolderOpen} from "react-icons/all";

function SidebarItem({id, count, type, label, items, depthStep = 10, depth = 0, ...rest}) {

    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <div key={`aa-${id}`}>
            <ListItem button dense {...rest} onClick={handleClick}
                      key={`bb-${id}`}
            >
                <ListItemText style={{paddingLeft: depth * depthStep * 3}} key={`cc-${id}`}>
                    <ListItemIcon key={`dd-${id}`}>
                        {type == "folder"
                            ? (!open
                                ? <FaRegFolder className={`icon`}/>
                                : <FaRegFolderOpen className={`icon`}/>)
                            : <FaFileAlt className={`icon`}/>
                        }

                    </ListItemIcon>
                    <span>{label}</span>
                </ListItemText>
                {(items && items.length > 0)
                    ? open ? <ExpandLess/> : <ExpandMore/>
                    : null}
                {/*<span className={`text-sm text-muted`}>{count}</span>*/}
            </ListItem>
            {(items && items.length > 0) ? (
                <div key={`er-${id}`}>
                    <Collapse in={open} timeout="auto" unmountOnExit key={`ee-${id}`}>
                        <List disablePadding dense
                              key={`ff-${id}`}>
                            {items.map((subItem, index) => (
                                <div key={`ok-${index}`}>
                                    <SidebarItem
                                        key={`${subItem.name}${index}`}
                                        depth={depth + 1}
                                        depthStep={depthStep}
                                        {...subItem}
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

function Sidebar({items, depthStep, depth}) {
    return (
        <div className="flex-grow">
            <h3 className={`text-lg pl-4 text-muted`}>Folders</h3>

            <List disablePadding dense key={depthStep}>
                {items.map((sidebarItem, index) => (
                    <div key={index}>
                        <SidebarItem
                            key={`${sidebarItem.name}${index}`}
                            depthStep={depthStep}
                            depth={depth}
                            {...sidebarItem}
                        />
                    </div>
                ))}
            </List>
        </div>
    )
}

function NoteList({notes}) {

    console.log(notes)
    return (
        <ul>
            {notes.map((note) => {
                return <li>{note.name}</li>
            })}
        </ul>

    )
}

export default Sidebar