import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { BarLink } from "../../components/BarLink";
import { useNavigate } from 'react-router-dom';

export default function SideBar(){
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <>
            <div className="p-2 hidden md:block w-[5rem]"></div>
            <header className="px-2 py-4 rounded-lg md:w-[5rem] bg-secondary fixed left-2 right-2 md:left-auto md:right-auto md:top-[2dvh] bottom-[1dvh] md:bottom-[2dvh] z-40 transition-all duration-300 ease-in group md:hover:w-[15%]">
                <nav className="flex md:flex-col justify-around md:justify-between md:min-h-full gap-x-2 md:gap-x-0">
                    <div className="hidden md:flex items-center group md:pl-2 md:pb-3 md:border-b-1 overflow-hidden md:border-b-primary">
                        <img src="/img/site/logo.png" alt="Logo imagem" className="shrink-0 w-10 h-10 ml-1 border border-primary rounded-full" />
                        <p className="hidden md:block text-primary text-sm ps-2 whitespace-nowrap opacity-0 translate-x-[-6px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"><span className="font-bold text-2xl">AZULI</span> PDV</p>
                    </div>

                    <div className="flex md:flex-col gap-4 w-full justify-around">
                        <BarLink link="/home" text="Home" url="/home">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="current" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                <path d="M9.375 21.875V14.7425C9.375 14.086 9.93464 13.5538 10.625 13.5538H14.375C15.0654 13.5538 15.625 14.086 15.625 14.7425V21.875M11.7756 3.34497L3.6506 8.83961C3.32085 9.06261 3.125 9.4236 3.125 9.80839V20.0919C3.125 21.0767 3.96447 21.875 5 21.875H20C21.0355 21.875 21.875 21.0767 21.875 20.0919V9.80839C21.875 9.4236 21.6792 9.06261 21.3494 8.83961L13.2244 3.34497C12.7907 3.05168 12.2093 3.05168 11.7756 3.34497Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </BarLink>

                        <BarLink link="/" text="PDV" url="/">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="current" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </BarLink>

                        <button type="button" onClick={() => setOpen(!open)} className={`bg-[#30384b] fill-none hover:bg-secondary-dark w-9 h-9 md:w-full md:h-[60px] flex items-center justify-between md:justify-between rounded-md p-1 md:p-0 md:px-5 overflow-hidden group cursor-pointer text-primary`}>
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="current" width="25" height="25" viewBox="0 0 25 25" stroke-width="1.5" stroke="currentColor" className="">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                                </svg>
                                <p className={`text-primary hidden md:block text-md ms-3 whitespace-nowrap opacity-0 translate-x-[-6px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-100`}>Loja</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="current" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        {open && ( 
                            <div className="ml-8 pl-2 overflow-hidden group cursor-pointer flex flex-col gap-y-2 border-l border-gray-500">
                                <BarLink link="/produtos" text="Produtos" url="/produtos" className="md:h-[30px]" />
                                <BarLink link="/usuarios" text="Usuários" url="/usuarios" className="md:h-[30px]" />
                                <BarLink link="/clientes" text="Clientes" url="/clientes" className="md:h-[30px]" />
                            </div>
                        )}
                        
                        <BarLink link="/notificacoes" text="Notificações" url="/notificacoes">
                            <svg width="24" height="24" viewBox="0 0 19 20" fill="current" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                <path d="M11.919 14.832C13.7822 14.6114 15.6129 14.1717 17.373 13.522C15.8824 11.8708 15.0587 9.7245 15.062 7.5V6.75C15.062 5.1587 14.4299 3.63258 13.3046 2.50736C12.1794 1.38214 10.6533 0.75 9.062 0.75C7.4707 0.75 5.94458 1.38214 4.81936 2.50736C3.69414 3.63258 3.062 5.1587 3.062 6.75V7.5C3.06502 9.72463 2.24099 11.871 0.75 13.522C2.483 14.162 4.31 14.607 6.205 14.832M11.919 14.832C10.021 15.0571 8.10301 15.0571 6.205 14.832M11.919 14.832C12.0631 15.2819 12.0989 15.7594 12.0236 16.2257C11.9482 16.692 11.7638 17.134 11.4854 17.5156C11.2069 17.8972 10.8423 18.2076 10.4212 18.4216C10.0001 18.6356 9.53438 18.7472 9.062 18.7472C8.58962 18.7472 8.12392 18.6356 7.70281 18.4216C7.28169 18.2076 6.91707 17.8972 6.63862 17.5156C6.36017 17.134 6.17576 16.692 6.10041 16.2257C6.02506 15.7594 6.0609 15.2819 6.205 14.832" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </BarLink>

                        <BarLink link="/me" text="Minha Conta" url="/me">                            
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="current" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                <path d="M1 19.1124C1 15.3369 4.15429 12.2762 10.6 12.2762C17.0457 12.2762 20.2 15.3369 20.2 19.1124C20.2 19.7131 19.7618 20.2 19.2212 20.2H1.97882C1.43823 20.2 1 19.7131 1 19.1124Z" stroke="white" strokeWidth="2"/>
                                <path d="M14.2 4.6C14.2 6.58822 12.5882 8.2 10.6 8.2C8.61177 8.2 7 6.58822 7 4.6C7 2.61177 8.61177 1 10.6 1C12.5882 1 14.2 2.61177 14.2 4.6Z" stroke="white" strokeWidth="2"/>
                            </svg>
                        </BarLink>

                        {/* logout display mobile */}
                        <BarLink link="/logout" text="Sair" url="/logout" style="md:hidden">
                            <svg width="18" height="18" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                <path d="M7.06618 1H3.20588C2.62085 1 2.05977 1.23047 1.64609 1.6407C1.2324 2.05094 1 2.60734 1 3.1875V16.3125C1 16.8927 1.2324 17.4491 1.64609 17.8593C2.05977 18.2695 2.62085 18.5 3.20588 18.5H7.06618M7.34033 9.75H19.8403M19.8403 9.75L15.0641 4.75M19.8403 9.75L15.0641 14.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="hidden md:block text-primary text-md ms-3 whitespace-nowrap opacity-0 translate-x-[-6px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-100">Sair</p>
                        </BarLink>
                    </div>

                    <div className="hidden md:flex md:flex-col gap-2 md:gap-4">
                        <BarLink link={null} text="Sair" url="/logout" onClick={handleLogout}> 
                            <svg width="18" height="18" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                <path d="M7.06618 1H3.20588C2.62085 1 2.05977 1.23047 1.64609 1.6407C1.2324 2.05094 1 2.60734 1 3.1875V16.3125C1 16.8927 1.2324 17.4491 1.64609 17.8593C2.05977 18.2695 2.62085 18.5 3.20588 18.5H7.06618M7.34033 9.75H19.8403M19.8403 9.75L15.0641 4.75M19.8403 9.75L15.0641 14.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </BarLink>
                    </div>
                </nav>
            </header>
        </>
    );
}