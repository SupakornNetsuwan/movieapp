import React , {useEffect} from "react";

const ExComponent = ({setPage}) =>{

    /* When change page */
    useEffect(()=>{
        setPage("/popular")
    },[setPage])
   
    return( 
        <div className="h-screen w-full px-10 box-border border-t"> {/* top nav */}
            <p className="text-center">Popular</p>
        </div>
    )
}

export default ExComponent