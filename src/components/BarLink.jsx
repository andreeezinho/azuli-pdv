import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";

export function BarLink({link, text, url, onClick, children, style, className}){
    const location = useLocation();

    return(
        <NavLink to={link} onClick={onClick} className={`${url === location.pathname ? "bg-secondary-dark fill-white text-white" : "bg-[#30384b] fill-none"} hover:bg-secondary-dark w-9 h-9 md:w-full ${className ? "md:h-[35px]" : "md:h-[60px]" }  flex items-center justify-center md:justify-normal rounded-md p-1 md:p-0 md:px-5 overflow-hidden group ${style}`}>
            {children}
            <p className={`text-primary hidden md:block text-md ms-3 whitespace-nowrap opacity-0 translate-x-[-6px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-100`}>{text}</p>
        </NavLink>
    )
}