import {useState , useEffect} from "react";

let useSlideIndex = (page , indexMovie) =>{
    let [currentSlide , setCurrentSlide] = useState(0)
    let [lastSlide , setLastSlide] = useState(0)
    
    
    useEffect(()=>{
        let findValue = () =>{
            if(window.innerWidth > 1536){
                setCurrentSlide((14*(page-1))+indexMovie-1)
                setLastSlide(page*14)
            }else if(window.innerWidth <= 1536 && window.innerWidth >= 1024){
                setCurrentSlide((page-1)*16 + indexMovie)
                setLastSlide(page*16)
            }else if(window.innerWidth < 1024 && window.innerWidth >= 768){
                setCurrentSlide(indexMovie*page > 16*page ? 16*page :(page-1)*16 + indexMovie)
                setLastSlide(page*16)
            }else if(window.innerWidth < 768 && window.innerWidth >= 552){
                setCurrentSlide((page-1)*18 + indexMovie +1)
                setLastSlide(page*18)
            }else{
                setCurrentSlide((page-1)*19 + indexMovie +1)
                setLastSlide(page*19)
            }
        }

        findValue()
    },[ indexMovie , page ])
    
    return [currentSlide, lastSlide]
}

export default useSlideIndex