import React , { useState , useEffect } from "react";
import { useRouteMatch, useParams , Switch , Route } from "react-router-dom";
const axios = require("axios");

const Movie = () =>{
    let {url} = useRouteMatch()

    return(
        <div className="min-h-screen w-full p-5 sm:p-10 box-border border-t">
            <Switch>
                <Route exact path={url}>
                    <MovieNotFound/>
                </Route>
                {/* If the path is exactly same as Linked from App.js, it's meaning that it has no movieId  */}
                <Route path={`${url}/:movieId`}>
                    <MovieDisplay/>
                </Route>
                <Route path="*">
                    <MovieNotFound/>
                </Route>
            </Switch>
        </div>
    )
}

const MovieNotFound = () =>{
    console.log(useRouteMatch())
    return(
        <div className="mt-20">
            <div className="transform -translate-y-20 relative text-center font-nunito text-xl font-bold">
                <h2 className="text-gray-300">This is Movie page</h2>
                <h2 className="text-red-1 text-2xl font-extrabold">Please choose movie</h2>
            </div>
        </div>
    )
}

const MovieDisplay = () =>{
    let { movieId } = useParams()
    let [movie , setMovie] = useState({})

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3c2a335bd3dd434426a12c115c059226&language=th&append_to_response=image`)
        .then((data)=> setMovie(data.data))
        .catch((err)=> console.log("Fetch error"))
    },[movieId])

    /* data check after API fetched */
    useEffect(()=>{
        console.log(Object.keys(movie))
    },[movie])

    if(Object.keys(movie).length === 0){
        <div>
            <p>Loading...</p>
        </div>
    }

    return(
        <div>
            <p>{movie.title}</p>
        </div>
    )
}

export default Movie