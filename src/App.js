import React , {useState , useEffect , useRef} from "react";
import {Route , Switch , Link } from "react-router-dom";
import {HiHome , HiStar , HiTrendingUp , HiOutlineUser , HiOutlineLogout , HiOutlineMenuAlt1 , HiUser , HiOutlineX , HiOutlineSearch} from "react-icons/hi"
/* Gsap */
import {gsap , Power3} from "gsap"

/* Other pages */
import Landing from "./pages/Landing.js";
import Home from "./pages/Home.js"
import Popular from "./pages/Popular";
import Trending from "./pages/Trending";
import Search from "./pages/Search.js";
import Movie from "./pages/Movie.js";

function App() {

  let [page , setPage] = useState("/")
  let [toggle , setToggle] = useState(false)
  let [searchModal , setSearchModal] = useState(false)

  /* Animation of top Nav goes here*/
  const topNav = useRef()

  useEffect(()=>{
    gsap.from(topNav.current, {
      y:-10,
      opacity:0,
      ease:Power3.easeInOut,
      duration:0.75
    })
    gsap.from(".nav-stack",{
      xPercent:-20,
      opacity:0,
      ease:Power3.easeOut,
      stagger:{
        each:0.1
      }
    })  
  },[])

  return (
    <>
      <div className={`${searchModal && "active"} search-modal`}> {/* Search Modal */}
          <Search searchModal={searchModal} setSearchModal={setSearchModal}/>
          <div onClick={()=> setSearchModal(false)} className={`${searchModal && "active"} bg-search-modal`}/>
      </div>

      <div className={`${searchModal && "max-h-screen overflow-hidden"} min-h-screen bg-white xl:ml-72`}>
        {/* Left nav */}
        <nav className={`${toggle ? "left-0" : "-left-64"} nav`}>
            <div className="py-6 px-16 bg-transparent">
              <Link to="/" onClick={()=> setToggle(false)}><h2 className="font-pacifico font-bold text-3xl text-red-4 text-center">Mov.<span className="text-black-1">find</span></h2></Link>
            </div>

            <div className="flex flex-col justify-between h-full min-h-800 bg-white-1 rounded-2xl border-t lg:rounded-none">
              <div className="pl-9 mt-8 font-nunito"> {/* menu */}
                <h2 className="font-semibold text-white-3 mb-3 nav-stack" >Menu</h2>
                <ul className="flex flex-col space-y-3">

                  <li className="nav-stack">
                      <Link to="/home/1" className={page==="/home" ? "flex justify-between" : ""} onClick={()=> setToggle(false)}>
                        <div className={page==="/home" ? "left-nav-btn-active" :"left-nav-btn"}>
                          <div className="flex items-center space-x-6">
                            <div className={page==="/home" ? "left-nav-icon-wrapper-active" : "left-nav-icon-wrapper"}><HiHome/></div>
                            <p className={page==="/home" ? "font-bold text-lg text-white" : "font-normal text-base text-gray-3 group-hover:text-gray-500"}>Home</p>
                          </div>
                        </div>
                        <div className={page==="/home" ? "w-1 bg-red-1 rounded-tl-md rounded-bl-md" : "invisible"}></div>
                      </Link>
                  </li>

                  <li className="nav-stack">
                      <Link to="/popular" className={page==="/popular" ? "flex justify-between" : ""} onClick={()=> setToggle(false)}>
                        <div className={page==="/popular" ? "left-nav-btn-active" :"left-nav-btn"}>
                          <div className="flex items-center space-x-6">
                            <div className={page==="/popular" ? "left-nav-icon-wrapper-active" : "left-nav-icon-wrapper"}><HiStar/></div>
                            <p className={page==="/popular" ? "font-bold text-lg text-white" : "font-normal text-base text-gray-3 group-hover:text-gray-500"}>Popular</p>
                          </div>
                        </div>
                        <div className={page==="/popular" ? "w-1 bg-red-1 rounded-tl-md rounded-bl-md" : "invisible"}></div>
                      </Link>
                  </li>

                  <li className="nav-stack">
                      <Link to="/trending" className={page==="/trending" ? "flex justify-between" : ""} onClick={()=> setToggle(false)}>
                        <div className={page==="/trending" ? "left-nav-btn-active" :"left-nav-btn"}>
                          <div className="flex items-center space-x-6">
                            <div className={page==="/trending" ? "left-nav-icon-wrapper-active" : "left-nav-icon-wrapper"}><HiTrendingUp/></div>
                            <p className={page==="/trending" ? "font-bold text-lg text-white" : "font-normal text-base text-gray-3 group-hover:text-gray-500"}>Trending</p>
                          </div>
                        </div>
                        <div className={page==="/trending" ? "w-1 bg-red-1 rounded-tl-md rounded-bl-md" : "invisible"}></div>
                      </Link>
                  </li>
                </ul>
              </div>

              <div className="ml-9 mb-8 mr-5 font-nunito">{/* Profile */}
                <h2 className="font-semibold text-white-3 mb-3 nav-stack">Profile</h2>
                <div className="py-2 px-1.5 bg-gray-100 rounded-xl nav-stack">
                  <ul className="flex flex-col space-y-3">
                    <Link to="/profile">
                      <li className="w-full bg-white-1 text-green-1 p-1.5 px-3 mr-4 rounded-lg border-2 border-green-1 hover:shadow-md hover:bg-green-2 hover:text-white-1 transition-all duration-200 ease-in-out">
                        <div className="flex justify-between items-center space-x-10">
                          <p className="font-semibold text-md">Profile</p>
                          <div className="text-xl rounded-md"><HiOutlineUser/></div>
                        </div>
                      </li>
                    </Link>
                    <Link to="/logout">
                      <li className="w-full bg-white-1 text-red-1 p-1.5 px-3 mr-4 rounded-lg border-2 border-red-1 hover:shadow-md hover:bg-red-lighter hover:text-white-1 transition-all duration-200 ease-in-out">
                        <div className="flex justify-between items-center space-x-10">
                          <p className="font-semibold text-md">Log out</p>
                          <div className="text-xl rounded-md"><HiOutlineLogout/></div>
                        </div>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
        </nav>

        {/* Right content */}
        <div className="bg-white-2 relative flex flex-col items-center justify-start divide-y" id="right-content">
          <div className=" w-full flex justify-between items-center box-border px-5 py-3 xl:py-5 xl:px-10 xl:justify-end bg-white-2 z-20"> {/* Top Nav */}
            <div onClick={()=> setToggle(!toggle)} className="text-2xl fixed top-0 right-0 z-40 p-4 xl:hidden">{toggle?<HiOutlineX/>:<HiOutlineMenuAlt1/>}</div>
            <div className={"w-full flex xl:justify-end items-center"} ref={topNav}>
              <button onClick={()=> setSearchModal(true)} className={`${searchModal && "active"} search-btn`}>
                <div><HiOutlineSearch/></div>
                <p>Search</p>
              </button>
              <div className="hidden xl:block ml-5 bg-red-1 p-2.5 rounded-full border-2 border-green-2">
                <div className="text-lg text-gray-1"><HiUser/></div>
              </div>
            </div>
          </div>

          <Switch>
            <Route exact path="/home/:paramPageId">
              <Home setPage={setPage}/>
            </Route>
            <Route path="/popular">
              <Popular setPage={setPage}/>
            </Route>
            <Route path="/trending">
              <Trending setPage={setPage}/>
            </Route>
            <Route path="/movie">
              <Movie/>
            </Route>
            <Route path="*">
              <Landing setPage={setPage}/>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}


export default App;
