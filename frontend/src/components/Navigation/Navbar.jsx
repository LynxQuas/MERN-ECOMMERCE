import { NavLink } from "react-router-dom";
import NavList from "./NavList";
import NavLogo from "./NavLogo";

import { Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
    const [openNav, setOpenNav] = useState(false);
    const { auth, setAuth } = useUser();

    return (
        <nav className="flex transition-colors bg-white shadow-sm fixed w-full z-20 justify-between items-center py-7 px-10 md:px-20">
            <Bars3Icon
                className="w-8 h-8 block md:hidden cursor-pointer"
                onClick={() => setOpenNav(true)}
            />

            <NavLogo />

            <NavList className="hidden gap-5 items-center md:flex" />

            <div className="flex gap-5 items-center">
                <ShoppingCartIcon className="h-6 w-6 text-black" />
                {auth?.user ? (
                    <p
                        onClick={() => {
                            localStorage.removeItem("userData");
                            setAuth(null);
                        }}
                    >
                        {auth?.user?.firstName}
                    </p>
                ) : (
                    <NavLink to="/login" className="font-semibold">
                        Login
                    </NavLink>
                )}
            </div>

            {openNav && (
                <MobileNav
                    openNav={openNav}
                    onCloseNav={() => setOpenNav(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;
