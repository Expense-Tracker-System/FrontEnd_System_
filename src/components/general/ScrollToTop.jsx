import React, { useState, useEffect } from 'react'
import { FaAngleDoubleUp } from "react-icons/fa";

const ScrollToTop = () => {
    const[showScrollTopButton,setShowSrollTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 0){
                setShowSrollTopButton(true);
            }
            else{
                setShowSrollTopButton(false);
            }
        });
        
    },[])

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div>
            {showScrollTopButton && <FaAngleDoubleUp className='fixed bottom-5 right-10 h-12 w-12 rounded-full border-2 border-black bg-white text-black flex items-center justify-center cursor-pointer z-10' onClick={scrollTop} />}
        </div>
    );
};

export default ScrollToTop