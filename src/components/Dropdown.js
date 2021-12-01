import React from "react";
import {FaChevronCircleDown} from "react-icons/all";

function Dropdown(props) {

    const getId = () =>{
        return Math.floor(Math.random() * (1000) + 1);
    }
    const id = getId();
    console.log(props)
    return (
        <>
            <button
                id={`button-${id}`}
                data-dropdown-toggle={`dropdown-${id}`}
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-white md:p-0 font-medium flex items-center justify-between w-full md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown
                {/*<FaChevronCircleDown/>*/}
            </button>
            <div
                id={`dropdown-${id}`}
                className="hidden bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-1" aria-labelledby={`Large-button-${id}`}>
                    {props.values.map((item) => {
                        return (
                            <li key={`li-${getId()}`} value={item.value} className={"text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"}>{item.label}</li>
                        )
                    })}
                </ul>
            </div>

        </>
    )
}

export default Dropdown