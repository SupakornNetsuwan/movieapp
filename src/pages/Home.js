import React , { useState , useEffect } from "react";
import {useParams, Link, useHistory} from "react-router-dom";
import {AiOutlineLoading} from "react-icons/ai"
import {HiOutlineBeaker , HiArrowDown , HiOutlineXCircle} from "react-icons/hi"
/* custom hook for finding index of slider in each screen size */
import useFindSwiperIndex from "../swiperIndex.js";
/* Axios */
import axios from "axios";
/* Swiper */
import SwiperCore , {Navigation , Pagination} from "swiper"
import  { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/swiper-bundle.min.css';
SwiperCore.use([Navigation,Pagination])

const Home = ({setPage}) =>{
    /* When change page */
    useEffect(()=>{ setPage("/home") },[setPage])
    const {paramPageId} = useParams() //Get Page id
    
    // let [currentPage , setCurrentPage] = useState([1,2,3,4,5]) /*use to define how many slider should it has in one page*/
    let [movies , setMovies] = useState([])
    let [loading , setLoading] = useState(true)

    /* Trigger fetcher func after url has changed */
    useEffect(()=>{
      /* Start fetch movies */
      let fetcher = () =>{
        setMovies([])
        setLoading(true)
        let newUrls = [1,2,3,4,5].map((pageNum)=> axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=3c2a335bd3dd434426a12c115c059226&language=th&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum+(paramPageId*5)-5}&year=2021&with_watch_monetization_types=flatrate`))
        axios.all(newUrls)
          .then(axios.spread((...res)=> res.forEach(request => setMovies(prevMovies=> [...prevMovies,request]))))
          .catch((err)=> console.log("Error from fetching API"))
          .finally(()=> setLoading(false))
      }
      
      fetcher()
    },[paramPageId])
    
    // useEffect(()=>{
    //   console.log(movies)
    // },[movies])
    
    return(
      <div className="w-full min-h-screen flex-col px-0 sm:px-12 py-8 box-border">
        <div className="flex items-center font-nunito font-light text-gray-3 text-xl mt-10 ml-6 sm:ml-0"><span className="mr-1"><HiOutlineBeaker/></span>Discover</div>
        {/* All data -> map to each slider */!loading && movies.length>0 ? <div className="flex flex-col">{movies.map((movie,i)=> <Slider key={i} moviesInSlider={movie}/>)}</div> : <div className="loading"><AiOutlineLoading className="animate-spin"/></div>}
        <Loadmore loading={loading} paramPageId={paramPageId}/>
      </div>
    )
  }

  const Slider = ({moviesInSlider}) =>{
    //Each slider -> map to each movie in a slider
    let [progress , setProgress] = useState(0); //Swiper scrolling proress
    let [indexMovie , setIndexMovie] = useState(0) //Currently index of swiper
    let page = moviesInSlider.data.page //Current page

    let [currentSlide , lastSlide] = useFindSwiperIndex(page , indexMovie) //find index of each slider
    let history = useHistory()
    return(
      <>
        <div className="ml-auto mr-6 sm:mr-0 text-gray-400">{`${currentSlide} - ${lastSlide}`}</div>
        <div className="sm:w-44 h-1.5 flex bg-red-100 mx-6 sm:mx-0 sm:ml-auto mr-6 mb-2 rounded-full"><div className="bg-red-500 rounded-full" style={{width:`${progress}%`}}></div></div>
        <Swiper
        spaceBetween={10} slidesPerView={2} navigation breakpoints={{ 460:{slidesPerView:2,spaceBetween:20}, 550:{slidesPerView:3}, 768:{slidesPerView:4}, 1024:{slidesPerView:5},1536:{slidesPerView:7 , spaceBetween:10}}} centeredSlidesBounds="true" centeredSlides={true} loop={false} grabCursor={false} className="w-full mb-12 "
        onProgress={(e) => setProgress(Math.floor(e.progress * 100))} onSlideChange={(e)=> setIndexMovie(e.activeIndex - 1)}
        >
        {moviesInSlider.data.results.map((movie,i)=>{
          movie.title = movie.title.length>21 ? movie.title.slice(0,21).trim() + "..." : movie.title //Change title name if the name is too long
          let topCheck = page === 1 && [0,1,2].includes(i); //Check if the movies are top 3 on board
          let placement = ["1st","2nd","3rd"];

          return(
            <SwiperSlide key={movie.id} className={`each-card ${topCheck&&"top"} cursor-pointer`} onClick={()=> history.push("/movie/"+movie.id)}>
              <div className="poster-wrapper relative">
                {movie.poster_path ? <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.title}_poster`} className="w-full h-full object-cover"/> : <div className="w-full flex flex-col gap-2 justify-center items-center h-64 lg:h-72 font-nunito bg-gray-300">No image <div className="text-4xl"><HiOutlineXCircle/></div></div>}
              </div>
              <p className="movie-title">{movie.title}</p>
              {topCheck && <div className="ranking-placement">{placement[i]}</div>}
            </SwiperSlide>
          )
        })}
        </Swiper>
      </>
    )
  }

  const Loadmore = ({loading, paramPageId}) =>{
    let [showLoadmore, setShowLoadmore] = useState(false)
    //If loading than enable class active to loadmore-btn-wrapper
    
    useEffect(()=>{
      let loadmoreFunc = ()=> document.getElementById("right-content").offsetHeight - 150 < window.innerHeight + window.scrollY ? setShowLoadmore(true) : setShowLoadmore(false)
      window.addEventListener("scroll",loadmoreFunc)
      return ()=>{
        setShowLoadmore(false)
        window.removeEventListener("scroll",loadmoreFunc)
      }
    },[loading])
    
    return(
      <div className={`loadmore-btn-wrapper ${showLoadmore && "active"}`}>
        <Link to={`/home/${~~paramPageId+1}`}>
          <button className="loadmore-btn"><span>Load next</span><div className="p-2 ml-3 bg-white text-stroke-darker rounded-full"><HiArrowDown/></div></button>
        </Link>
      </div>
    )
  }

  export default Home;