import {ReactComponent as CogIcon} from '../icons/cog.svg';
import {ReactComponent as ChevronIcon} from '../icons/chevron.svg';
import {ReactComponent as ArrowIcon} from '../icons/arrow.svg';
import {ReactComponent as BoltIcon} from '../icons/bolt.svg';

import React, {useState, useEffect, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import FolderService from "../service/FolderService";

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');
    const dropdownRef = useRef(null);

    const [treeData, setTreeData] = useState([])

    /**************************************** */
    const fetchJson = (url) => fetch(url).then((r) => r.json());

    const getResult = (parent) =>
        fetchJson(`http://localhost:4000/folders/byparent/${parent}`).then(
            (items) => Promise.all(items.map(getResultAux))
        );

    const getResultAux = async (t = {}) => ({
        ...t,
        items: await getResult(t.id),
    });

    /******************************************* */

    useEffect(() => {
        // FolderService.getAll()
        //     .then((result) => {
        //         setFolders(result.data)
        //     })
        (async () => {
            let response = await getResult(0);
            setTreeData(response);
        })();


    }, [])

    function DropdownItem(props) {
        return (
            <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        );
    }

    function Menu({ items }) {
        return (
            <ul>
                <li>{items.name}</li>
                {items.map(item => {
                    <li>
                        {item.name}
                        {item.items && <Menu items={item.items}/>}
                    </li>
                })}
            </ul>
        );
    }

    console.log(treeData)
    return (
        <div className="dropdown" ref={dropdownRef}>

    <Menu items={treeData}/>

            {/*{treeData.map((folder) => {*/}
            {/*    return (*/}
            {/*        <div className={"menu"}>*/}
            {/*            <DropdownItem>{folder.name}</DropdownItem>*/}
            {/*            {folder.items.length > 0*/}
            {/*                ? <DropdownItem/>*/}
            {/*                :""*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*    )*/}

            {/*})}*/}

            {/*<CSSTransition*/}
            {/*    in={activeMenu === 'main'}*/}
            {/*    timeout={500}*/}
            {/*    classNames="menu-primary"*/}
            {/*    unmountOnExit*/}
            {/*    // onEnter={calcHeight}*/}
            {/*>*/}
            {/*    <div className="menu">*/}
            {/*        <DropdownItem>My Profile</DropdownItem>*/}
            {/*        <DropdownItem*/}
            {/*            leftIcon={<CogIcon/>}*/}
            {/*            rightIcon={<ChevronIcon/>}*/}
            {/*            goToMenu="settings">*/}
            {/*            Settings*/}
            {/*        </DropdownItem>*/}
            {/*        <DropdownItem*/}
            {/*            leftIcon="🦧"*/}
            {/*            rightIcon={<ChevronIcon/>}*/}
            {/*            goToMenu="animals">*/}
            {/*            Animals*/}
            {/*        </DropdownItem>*/}

            {/*    </div>*/}
            {/*</CSSTransition>*/}

            {/*<CSSTransition*/}
            {/*    in={activeMenu === 'settings'}*/}
            {/*    timeout={500}*/}
            {/*    classNames="menu-secondary"*/}
            {/*    unmountOnExit*/}
            {/*    // onEnter={calcHeight}*/}
            {/*>*/}
            {/*    <div className="menu">*/}
            {/*        <DropdownItem goToMenu="main" leftIcon={<ArrowIcon/>}>*/}
            {/*            <h2>My Tutorial</h2>*/}
            {/*        </DropdownItem>*/}
            {/*        <DropdownItem leftIcon={<BoltIcon/>}>HTML</DropdownItem>*/}
            {/*        <DropdownItem leftIcon={<BoltIcon/>}>CSS</DropdownItem>*/}
            {/*        <DropdownItem leftIcon={<BoltIcon/>}>JavaScript</DropdownItem>*/}
            {/*        <DropdownItem leftIcon={<BoltIcon/>}>Awesome!</DropdownItem>*/}
            {/*    </div>*/}
            {/*</CSSTransition>*/}

            {/*<CSSTransition*/}
            {/*    in={activeMenu === 'animals'}*/}
            {/*    timeout={500}*/}
            {/*    classNames="menu-secondary"*/}
            {/*    unmountOnExit*/}
            {/*    // onEnter={calcHeight}*/}
            {/*>*/}
            {/*    <div className="menu">*/}
            {/*        <DropdownItem goToMenu="main" leftIcon={<ArrowIcon/>}>*/}
            {/*            <h2>Animals</h2>*/}
            {/*        </DropdownItem>*/}
            {/*        <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>*/}
            {/*        <DropdownItem leftIcon="🐸">Frog</DropdownItem>*/}
            {/*        <DropdownItem leftIcon="🦋">Horse?</DropdownItem>*/}
            {/*        <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>*/}
            {/*    </div>*/}
            {/*</CSSTransition>*/}
        </div>
    );
}

export default DropdownMenu