import {useState, useEffect} from "react";
import axios from "axios";

const useMovieFetch = (search, page)=>{
    let [searchResults , setSearchResults] = useState({results:[]})
    let [errorResults , setErrorResults] = useState(false)
    let [maxPage , setMaxPage] = useState(null)

    useEffect(()=>{
        if(search.length > 0){
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3c2a335bd3dd434426a12c115c059226&query=${search.replace(" ","+")}&page=${page}`)
                .then((response)=>{
                    if(response.data.results.length === 0){
                        setErrorResults(true)
                    }else{
                        setErrorResults(false)
                    }
                    setSearchResults(response.data)
                    setMaxPage(response.data.total_pages)
                })
                .catch(err=> console.log("Fetching error"))
        }else{
            setSearchResults({results:[]})
        }
    },[search, page])

    useEffect(()=>{
        setSearchResults({results:[]})
    },[page])

    return {
        errorResults,
        searchResults,
        maxPage
    }
}

export default useMovieFetch