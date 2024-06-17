import React from 'react';
import logo from "../assets/BusLogo.svg"

const Navbar: React.FC = () => {
    return (
        <nav className="flex flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <img src={logo} alt="" className='w-10 mr-2'/>
                <span className="font-semibold text-xl tracking-tight">Bus Ticket Service</span>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="w-full  block flex-grow lg:flex lg:items-center lg:w-auto justify-center">
                <div className="text-sm lg:flex-grow lg:flex ">
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Tickets
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Menu
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                        Dashboard
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
