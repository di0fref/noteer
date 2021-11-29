import {FaSearch} from "react-icons/all";

function SearchInput() {
    return (
        <div className="relative mx-4">
            <input className=" h-10 px-5 w-full rounded-lg text-sm focus:outline-none"
                   type="search" name="search" placeholder="Search"/>
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                <FaSearch className={"text-gray-600 h-4 w-4 fill-current"}/>
            </button>
        </div>
    )
}

export default SearchInput