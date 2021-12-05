import {Tooltip} from "@mui/material";
import {FaFolder, FaRegFolder, FaTrash, FaTrashAlt} from "react-icons/all";

function Trash() {
    return (
        <>
            <div className="bg-primary text-normal pb-4 px-4 rounded-md w-full">
                <div className="flex justify-between w-full pt-1 ">

                </div>

                <div className="overflow-x-auto mt-6">
                    <table className="table-auto border-collapse w-full">
                        <thead>
                        <tr className="rounded-lg text-sm font-medium text-left" style={{fontSize: "0.9674rem"}}>
                            <th className="px-4 py-2 bg-secondary">Note</th>
                            <th className="px-4 py-2 bg-secondary">Date</th>
                            <th className="px-4 py-2 bg-secondary" colSpan={2}></th>
                        </tr>
                        </thead>
                        <tbody className="text-sm font-normal ">
                        <tr className="border-normal-b py-10">
                            <td className="px-4 py-4">Intro to CSS</td>
                            <td className="px-4 py-4">Adam</td>
                            {/*<Tooltip title={"Undo "}>*/}
                            <td className="px-4 py-4">
                                <div className={"flex flex-col justify-start items-start"}>
                                    <div className={"flex items-center"}>
                                        <span><FaRegFolder className={"text-green-500"}/></span>
                                        <span><button className={"text-acce nt ml-2"}></button></span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className={"flex items-center"}>
                                    <span><FaTrashAlt className={"text-red-500"}/></span>
                                    <span><button className={"text-a ccent ml-2"}></button></span>
                                </div>
                            </td>
                            {/*<td className="px-4 py-4"></td>*/}
                            {/*</Tooltip>*/}
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            {/*<style>*/}

            {/*    thead tr th:first-child {border - top - left - radius: 10px; border-bottom-left-radius: 10px;}*/}
            {/*    thead tr th:last-child {border - top - right - radius: 10px; border-bottom-right-radius: 10px;}*/}

            {/*    tbody tr td:first-child {border - top - left - radius: 5px; border-bottom-left-radius: 0px;}*/}
            {/*    tbody tr td:last-child {border - top - right - radius: 5px; border-bottom-right-radius: 0px;}*/}


            {/*</style>*/}
        </>
    )
}

export default Trash