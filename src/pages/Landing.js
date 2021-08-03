import React, { useState , useEffect, useMemo } from "react";
import {HiOutlineBookOpen , HiOutlineVideoCamera , HiOutlinePresentationChartBar , HiThumbUp , HiStar , HiClock , HiFilm} from "react-icons/hi"
import {FaVoteYea} from "react-icons/fa"
import {FaDollarSign} from "react-icons/fa"
/* Gsap */
import { gsap, Power3 } from "gsap";
/* Axios */
import axios from "axios";

const Landing = ({setPage}) =>{
    /* When change page */
    useEffect(()=>{
        setPage("/")
    },[setPage])

    /* Gsap animation */
    useEffect(()=>{
        gsap.from(".welcome-box", {
            y:-20,
            opacity:0,
            ease:Power3.easeInOut,
            duration:0.75
        })
    },[])

    let [movieInfos , setMovieInfos] = useState({})
    let [subTopic , setSubTopic] = useState("overview")

    useMemo(()=>{
        axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=3c2a335bd3dd434426a12c115c059226&language=th")
        .then((data)=> data.data.results[0].id)
        .then((movieId)=> axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3c2a335bd3dd434426a12c115c059226&language=th`))
        .then((movieData)=> setMovieInfos(movieData.data))
        .catch((err)=> setMovieInfos("fetchingError"))
    },[])

    // useEffect(()=>{
    //     console.log(movieInfos)
    // },[movieInfos])

    if(movieInfos === "fetchingError"){
        return(
            <div className="min-h-screen w-full p-10 box-border border-t"> {/* top nav */}
                <div className="px-6 xl:px-12 py-6  mx-0 rounded-xl border-2 border-gray-300 font-nunito text-center sm:text-left sm:space-y-3 welcome-box">
                    <p className="text-base sm:text-xl text-gray-500">Welcome back &#128515;</p>
                    <h2 className="fuck text-2xl sm:text-4xl font-bold">Supakorn Netsuwan</h2>
                </div>
                <div className="w-full h-64 bg-gray-200 text-4xl text-gray-500 font-medium flex justify-center items-center rounded-xl my-10">Fetching error</div>
            </div>
        )
    }

    return( 
        <div className="min-h-screen w-full p-5 sm:p-10 box-border border-t"> {/* top nav */}
            <div className="px-6 xl:px-12 py-6  mx-0 rounded-xl border border-gray-300 font-nunito text-center sm:text-left sm:space-y-3 welcome-box">
                <p className="text-base sm:text-xl text-gray-500">Welcome back &#128515;</p>
                <h2 className="text-2xl sm:text-4xl text-gray-700 font-bold">Supakorn Netsuwan</h2>
            </div>
            {(movieInfos.poster_path && movieInfos.backdrop_path) ?
                <div className="mt-12 relative flex items-center lg:flex-col"> {/* Content */}
                    <div className="bg-white relative w-full lg:max-w-4xl 2xl:max-w-5xl flex flex-col md:flex-row rounded-xl border border-gray-300 md:shadow-lg z-10 lg:mt-16">
                        <div className="flex flex-col items-center pt-6 pb-12 px-6 md:py-8 md:px-8 lg:px-12">
                            <p className="font-nunito text-gray-400 font-normal text-lg">Movie of the day</p>
                            <h2 className="max-w-full text-center mt-1 mb-10 md:mb-5 font-nunito text-red-1 font-extrabold text-2xl lg:text-2xl 2xl:text-3xl">{movieInfos.original_title}</h2>
                            <div className="w-56 lg:w-64">
                                <img src={`https://image.tmdb.org/t/p/w300/${movieInfos.poster_path}`} className="w-full h-full rounded-lg" alt="poster"/>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col md:flex-row">
                            <ul className="flex flex-row justify-center md:flex-col border-b md:border-l-2 md:border-r">
                                <li onClick={()=> setSubTopic("overview")} className={`${subTopic === "overview" ? "bg-gray-100 text-gray-700" : "text-gray-400 hover:bg-gray-50 w-1/3 transition-all duration-200"} w-1/3 md:w-auto md:h-1/3 relative flex justify-center items-center p-2.5 cursor-pointer rounded-tl-md rounded-tr-md md:rounded-none`}>
                                    <div className={subTopic === "overview" ? "w-full h-0.5 md:w-1 md:h-full absolute bg-red-1 bottom-0 md:top-0 left:0 md:-left-1 rounded-tl-md rounded-bl-md" : ""}/>
                                    <div className="text-2xl"><HiOutlineBookOpen/></div>
                                </li>
                                <li onClick={()=> setSubTopic("production")} className={`${subTopic === "production" ? "bg-gray-100 text-gray-700" : "text-gray-400 hover:bg-gray-50 w-1/3"} w-1/3 md:w-auto md:h-1/3 relative flex justify-center items-center px-2.5 cursor-pointer rounded-tl-md rounded-tr-md md:rounded-none`}>
                                    <div className={subTopic === "production" ? "w-full h-0.5 md:w-1 md:h-full absolute bg-red-1 bottom-0 md:top-0 left:0 md:-left-1 rounded-tl-md rounded-bl-md" : ""}/>
                                    <div className="text-2xl"><HiOutlineVideoCamera/></div>
                                </li>
                                <li onClick={()=> setSubTopic("statistic")} className={`${subTopic === "statistic" ? "bg-gray-100 text-gray-700" : "text-gray-400 hover:bg-gray-50 w-1/3"} w-1/3 md:w-auto md:h-1/3 relative flex justify-center items-center px-2.5 cursor-pointer rounded-tl-md rounded-tr-md md:rounded-none`}>
                                    <div className={subTopic === "statistic" ? "w-full h-0.5 md:w-1 md:h-full absolute bg-red-1 bottom-0 md:top-0 left:0 md:-left-1 rounded-tl-md rounded-bl-md" : ""}/>
                                    <div className="text-2xl"><HiOutlinePresentationChartBar/></div>
                                </li>
                            </ul>
                            <div className="flex-1">
                                <SubContent subTopic={subTopic} movieInfos={movieInfos}/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full absolute top-0 h-backdrop-2 md:h-backdrop-1 overflow-hidden rounded-lg hidden lg:block z-0">
                        <img src={`https://image.tmdb.org/t/p/w1280/${movieInfos.backdrop_path}`} className="w-full h-full object-cover object-top filter blur-sm saturate-50" alt="bg"/>
                    </div>
                </div>
            :   <div className="w-full h-64 bg-gray-200 text-4xl text-gray-500 font-medium flex justify-center items-center rounded-xl my-10">Loading...</div>}
            </div>
        )
}

let SubContent = ({subTopic , movieInfos}) =>{
    let budgetComma = movieInfos.budget.toString().split("").reverse().join("").match(/\d{1,3}/g).reverse().map(digits=> digits.split("").reverse().join("")).join(",")
    if(subTopic === "statistic"){
        return(
            <div className="w-full h-full max-h-scroll p-6 lg:p-10 pt-12">
                <div className="flex justify-between items-center pb-1"> {/* Statistic topic with score */}
                    <p className="text-red-1 text-xl font-nunito font-semibold">Statistic</p>
                    <div className="flex items-center gap-x-1 font-nunito text text-gray-500">
                        <p>{movieInfos.vote_average} /10</p>
                        <div className="relative transform -translate-y-0.5 text-lg"><HiThumbUp/></div>
                    </div>
                </div>
                <div className="w-full h-1 rounded-full bg-gray-200 flex overflow-hidden mb-7"> {/* Score bar */}
                    <div className="bg-green-2 rounded-full" style={{"width":movieInfos.vote_average*10+"%"}}/>
                </div>
                <div className="statistic-detail-wrapper">
                    <div className="flex items-center"><div className="w-9 text-xl text-gray-700"><FaVoteYea/></div><p className="font-nunito text-sm lg:text-base text-gray-600 font-light">Vote count</p></div>
                    <p className="statistic-value">{movieInfos.vote_count || "Null"}</p>
                </div>
                <div className="statistic-detail-wrapper">
                    <div className="flex items-center"><div className="w-9 text-xl text-gray-700"><HiStar/></div><p className="font-nunito text-sm lg:text-base text-gray-600 font-light">Popularity</p></div>
                    <p className="statistic-value">{Math.floor(movieInfos.popularity) || "Null"}</p>
                </div>
                <div className="statistic-detail-wrapper">
                    <div className="flex items-center"><div className="w-9 text-xl text-gray-700"><HiClock/></div><p className="font-nunito text-sm lg:text-base text-gray-600 font-light">Run time</p></div>
                    <p className="statistic-value">{`${Math.floor(movieInfos.runtime/60)}:${movieInfos.runtime%60} hrs` || "Null"}</p>
                </div>
                <div className="statistic-detail-wrapper">
                    <div className="flex items-center"><div className="w-9 text-xl text-gray-700"><HiFilm/></div><p className="font-nunito text-sm lg:text-base text-gray-600 font-light">Release date</p></div>
                    <p className="statistic-value">{movieInfos.release_date}</p>
                </div>
            
            </div>
        )
    }

    if(subTopic === "production"){
        return(
            <div className="w-full h-full p-10 pt-12 max-h-scroll overflow-y-scroll">
                <div className="divide-y divide-dotted"> {/* Companies */}
                    <p className="text-gray-500 font-nunito font-semibold mb-1">Production</p>
                    <div>
                        {movieInfos.production_companies.map((company)=>{
                            return(
                                <div key={company.name} className="w-full bg-gray-100 px-4 py-5 my-2 flex justify-center rounded-md">
                                    {company.logo_path ? <img src={`https://image.tmdb.org/t/p/w1280${company.logo_path}`} className="w-1/4 lg:w-1/2" alt={company.name}/> : <p className="font-nunito text-gray-700">{company.name}</p>}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="divide-y divide-dotted"> {/* Budget */}
                    <p className="text-gray-500 font-nunito font-semibold mt-12 mb-1">Budget</p>
                    <div className="flex justify-between items-center">
                        <p className="font-nunito font-semibold text-2xl text-gray-800 mt-2">{budgetComma}</p>
                        <div className="mt-2 text-gray-500 text-lg"><FaDollarSign/></div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="h-full max-h-scroll flex flex-col p-10 pt-12 divide-y divide-dotted">
            <p className="text-gray-500 font-nunito font-semibold mb-1">Overview</p>
            <div>
                <p className="font-prompt mt-4">{movieInfos.overview}</p>
            </div>
        </div>
    )
}

export default Landing;