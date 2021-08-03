import React , {useState , useEffect , useRef} from "react";
import { useHistory } from "react-router";
import {HiSearch , HiChevronDown , HiOutlineChevronRight, HiOutlineXCircle , HiChevronRight , HiChevronLeft, HiOutlineSearch , HiStar , HiOutlineFilm} from "react-icons/hi";
import useMovieFetch from "../useMovieFetch";
import {month} from "../monthFormater.js";

const Search = ({searchModal , setSearchModal}) =>{
    let [search , setSearch] = useState("")
    let [page , setPage] = useState(1) /* Current page */
    let [sortModal , setSortModal] = useState(false) /* Filter modal */
    let [sort , setSort] = useState("ID") /* Sort's value */

    let input = useRef()
    /* Auto focus when click search modal */
    useEffect(()=>{
        input.current.focus()
    },[sort, searchModal])

    /* Fetch search */
    useEffect(()=>{
        setPage(1)
    },[search])

    let {errorResults, searchResults, maxPage} = useMovieFetch(search, page)

    return(
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-11/12 xl:w-10/12 h-90% overflow-y-scroll md:overflow-auto bg-white rounded-tr-2xl rounded-tl-xl border">
            <div className="flex justify-center items-center mb-10 m-5">
                <p className="hidden sm:block">{searchResults.results.length > 0 ? page : ""}</p>
                <div onClick={()=> (page > 1 && searchResults.results.length > 0) && setPage(prevPage=> prevPage - 1)} className={`${searchResults.results.length === 0 && "disabled"} page-btn`}><HiChevronLeft/></div>
                <div className="relative flex py-1.5 w-auto md:w-2/4 md:max-w-md border border-gray-400 divide-x-2 text-gray-500 rounded-md focus-within:shadow-md transition-all duration-300">
                    <label htmlFor="search" className="flex items-center divide-x-2 space-x-2 transform px-4 font-nunito text-xl cursor-pointer ">
                        <HiSearch/>
                    </label>
                    <input ref={input} type="text" id="search" className="outline-none w-full px-2 sm:px-5 py-0.5 font-nunito text-xl text-gray-500 focus-within:text-gray-800 font-bold transition-colors duration-300 " value={search} onChange={(e)=> setSearch(e.target.value)} autoComplete="off"/>
                </div>
                <div onClick={()=> (page < maxPage && searchResults.results.length > 0) && setPage(prevPage=> prevPage + 1)} className={`${searchResults.results.length === 0 && "disabled"} page-btn`}><HiChevronRight/></div>
                <p className="hidden sm:block">{searchResults.results.length > 0 ? maxPage : ""}</p>
            </div>
            <div className="divide-y mx-5 md:mx-10">
                <div className="flex justify-between items-end mb-2">
                    <h2 className="font-nunito text-lg text-gray-400"><span className="mr-2 text-red-1 font-bold">{searchResults.results.length} results</span><span className={!search ? "hidden" : "hidden md:inline-block"}>with {search}</span></h2>
                    <div onClick={()=> setSortModal(!sortModal)}  className="relative flex items-center space-x-2 border border-gray-400 py-1.5 px-2 rounded-md shadow-sm select-none cursor-pointer">
                        <h2 className="hidden md:block text-gray-400 text-sm">Sorted by</h2>
                        <div className="relative flex items-center font-semibold text-gray-600">
                            <h2>{sort}</h2>
                            <div className={`${sortModal && "rotate-180"} transform duration-150 text-lg ml-1`}><HiChevronDown/></div>
                        </div>
                        <ul className={`z-10 absolute w-36 top-12 right-0 py-1 bg-white border rounded-md shadow-md transform opacity-0 duration-300 pointer-events-none ${sortModal && "duration-300 opacity-100 pointer-events-auto"}`}> {/* Fitler modal */}
                            {["popularity" , "ID"].map((name)=> <li key={name} onClick={()=>{ setSort(name); setSortModal(false)}} className="px-4 text-gray-600 py-2 font-nunito cursor-pointer hover:bg-gray-100">{name}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="py-2 h-auto">
                    <MovieSearched seachData={{search , searchResults , sort , errorResults , setSearchModal}}/>
                </div>
            </div>
        </div>
    )
}

const MovieSearched = ({seachData}) =>{
    let {search , searchResults , errorResults , setSearchModal} = seachData
    
    // useEffect(()=>{
    //     console.log(searchResults.results)
    // },[searchResults])

    let dateFormat = (date) =>{
        if(date){
            date = date.split("-").reverse().map((date, i)=> i === 1 ? month[date] : ~~(date)).join(" ")
        }else{
            date = "Undefinded :("
        }
        return date
    }

    const history = useHistory()
    if(searchResults.results.length > 0){
        return(
            <div className="flex flex-col space-y-2">
                {searchResults.results.map((movie)=>{
                  
                    return(
                        <div key={movie.id} className="w-full flex bg-white-1 border-b shadow-sm rounded-lg sm:divide-x divide-gray-200 border border-gray-200">
                            <div className="w-40 sm:w-48 p-1 sm:p-3.5">
                                {movie.poster_path ? <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="" className="w-full h-full rounded-md"/> : <div className="w-full h-40 sm:h-52 flex flex-col justify-center items-center gap-2 font-nunito text-gray-400">No image<div className="text-4xl"><HiOutlineXCircle/></div></div>}
                            </div>
                            <div className="flex-1 flex xl:py-4 pl-2 sm:pl-6 pr-0 xl:pr-3.5 box-border">
                                <div className="flex flex-col flex-1 pt-1 sm:py-4 xl:py-0">
                                    <h2 className="w-40 sm:w-full sm:max-w-xs md:max-w-lg truncate font-nunito font-bold text-md sm:text-xl text-gray-700">{movie.title}</h2>
                                    <div className="flex w-11/12 h-0.5 sm:h-1 bg-gray-200 rounded-full mt-2"><div style={{width:`${movie.vote_average*10}%`}} className="bg-green-3 rounded-full"></div></div>
                                    <p className="font-nunito text-gray-400 mt-2">Vote:<span className="text-gray-600 font-bold ml-2">{movie.vote_average}/10</span></p>
                                    <div className="flex-1 flex items-end">
                                        <div className="flex gap-x-1">
                                            <div className="tag-scoredate"><HiStar className="text-gray-700"/>{Math.floor(movie.popularity)}</div>
                                            <div className="tag-scoredate"><HiOutlineFilm className="text-gray-700"/>{dateFormat(movie.release_date)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={()=>{ history.push("/movie/"+movie.id); setSearchModal(false)}} className="px-1.5 sm:px-4 xl:px-10 flex items-center justify-center text-3xl bg-gray-300 border border-gray-400 text-white rounded-tr-md rounded-br-md xl:rounded-lg hover:bg-red-1 hover:border-transparent cursor-pointer transition-colors duration-150">
                                    <HiOutlineChevronRight/>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    if(errorResults){
        return(
        <div className="pt-24 font-nunito text-xl text-gray-400">
            <p className="text-center">Movies not found</p>
        </div>
        )
    }

    if(search && searchResults.results.length === 0){
        return(
        <div className="pt-24 font-nunito text-xl text-gray-400">
            <p className="text-center">Loading....</p>
        </div>
        )
    }

    return(
        <div className="flex justify-center items-center space-x-2 pt-24 font-nunito text-xl text-gray-400">
            <div><p>Please search</p></div>
            <div className="flex"><HiOutlineSearch/></div>
        </div>
    )
}

export default Search
