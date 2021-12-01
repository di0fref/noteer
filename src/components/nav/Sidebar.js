import React, {useEffect, useState} from 'react'
import {List, ListItem, ListItemText, Collapse, ListItemIcon} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {
    FaBars,
    FaChevronLeft,
    FaFile,
    FaFileAlt, FaFolder,
    FaRegFolder,
    FaRegFolderOpen,
    FaStar,
    FaTrash,
    FaTrashAlt
} from "react-icons/all";
import FolderService from "../../service/FolderService";
import Avatar from "../Avatar";
import SearchInput from "../SearchInput";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../Constants";
import {useDrop} from "react-dnd";
import NotesService from "../../service/NotesService";

function SidebarItem(props, {isDragging, id_}) {

    const [{opacity}, drag] = useDrag(
        () => ({
            type: ItemTypes.CARD,
            item: props.items,
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.1 : 1,
            }),
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult();
                if (item && dropResult) {
                    switch (item.type) {
                        case "note":
                            console.log(`Moving note ${item.id} into folder ${dropResult.id}`);

                            if (item.id !== dropResult.id) {
                                NotesService.updateFolder(item.id, {folder_id: dropResult.id}).then((result) => {
                                    /* Send signal to update sidebar */
                                    props.droppedHandler();
                                });
                            } else {
                                console.log("Drag ref == Drop ref:: Skipping");
                            }
                            break;
                        case "folder":
                            console.log(`Moving folder ${item.id} into folder ${dropResult.id}`);
                            if (item.id !== dropResult.id) {
                                FolderService.updateFolder(item.id, {folder_id: dropResult.id}).then((result) => {
                                    /* Send signal to update sidebar */
                                    props.droppedHandler();
                                });

                            } else {
                                console.log("Drag ref == Drop ref:: Skipping");
                            }
                            break;
                    }
                }
            },
        }), []
    );


    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: () => ({name: "SidebarLink", id: props.items.id, type: props.items.type}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));


    /* Attach both drag and drop ref to the component. */
    const attacheRef = (el) => {
        drag(el)
        drop(el)
    }

    const isActive = canDrop && isOver;
    const [open, setOpen] = useState(false); // Open or closed sidebar menu
    const handleClick = (type, id) => {
        setOpen(!open);
        props.noteClicked(type, id)
    };


    useEffect(() => {
    }, [props.clicked_id])

    return (
        // <div key={`aa-${props.items.id}`} id={`aa-${props.items.id}`}>
        <>
            <ListItem button dense
                      id={props.items.id}
                      ref={attacheRef}
                      style={{opacity}}
                      role="card"
                      onClick={() => {
                          handleClick(props.items.type, props.items.id);
                      }}
                      key={`bb-${props.items.id}`}
                      selected={
                          (props.items.id === props.clicked_id) ? true : false
                      }
                      disableRipple disableTouchRipple
                      className={`${isActive ? "sidebar-active" : ""}`}
            >

                <ListItemText style={{paddingLeft: props.depth * props.depthStep * 3}} key={`cc-${props.items.id}`}>
                    <div className={'flex justify-start items-center'}>

                        {(props.icon === true)
                            ?
                            (props.items.type == "folder")
                                ? <FaRegFolder className={`icon`}/>
                                : <FaFileAlt className={`icon`}/>

                            : null}


                        <div className={`ml-2 text-s ${props.class}`}>{props.items.label}</div>
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
                                        droppedHandler={props.droppedHandler}
                                        class={""}
                                        icon={true}

                                    />
                                </div>
                            ))}
                        </List>
                    </Collapse>
                </div>
            ) : null}
        </>)
}

function Sidebar(props) {

    /* Dropref for moving items to root */
    const dropref_item = {
        "id": 0,
        "label": "",
        "type": "",
        "items": []
    }

    return (
        <div className="flex-grow">
            <SearchInput/>
            <h3 className={`text-xs pl-4 text-muted uppercase tracking-widest font-bold mb-2 mt-6`}>Bookmarks</h3>
            <div className={"flex justify-start items-center ml-4 _text-sm"}>
                <div><FaStar className={"icon text-accent"}/></div>
                <div className={"ml-2 text-s"}>Bookmark 1</div>
            </div>
            <h3 className={`text-xs pl-4 text-muted uppercase tracking-widest font-bold mb-2 mt-6`}>Notebooks</h3>

            <List disablePadding dense key={props.depthStep}>
                {props.items.map((sidebarItem, index) => (
                    // <div key={index}>
                    <SidebarItem
                        key={`${sidebarItem.name}${index}`}
                        depthStep={10}
                        depth={0}
                        noteClicked={props.noteClicked}
                        items={sidebarItem}
                        clicked_id={props.clicked_id}
                        droppedHandler={props.droppedHandler}
                        class={""}
                        icon={true}
                    />
                    // </div>
                ))}

                {/*Dropref for moving items to root */}

                <SidebarItem
                    key={`${dropref_item.name}`}
                    depthStep={10}
                    depth={0}
                    noteClicked={props.noteClicked}
                    items={dropref_item}
                    clicked_id={props.clicked_id}
                    droppedHandler={props.droppedHandler}
                    class={"text-more-muted"}
                    icon={false}
                />
            </List>
            <div className={"trash flex justify-start items-center text-sm ml-4 mt-14"}>
                <div><FaTrashAlt className={"icon"}/></div>
                <div className={"ml-2"}>Trash</div>
            </div>
            {/*<Avatar/>*/}
        </div>
    )
}

export default Sidebar