import React , { useEffect } from "react";

let Trending = ({setPage}) =>{

    /* When change page */
    useEffect(()=>{
        setPage("/trending")
    },[setPage])

    return(
        <div className="h-screen w-full px-10 box-border border-t"> {/* top nav */}
            <p className="text-center">Trending</p>
        </div>
    )
}

export default Trending;