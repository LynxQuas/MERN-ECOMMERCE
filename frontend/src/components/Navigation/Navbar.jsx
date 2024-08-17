import { NavLink } from "react-router-dom";
import NavList from "./NavList";
import NavLogo from "./NavLogo";

import { Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { useUser } from "../../context/UserContext";
import UserProfile from "../User/UserProfile";
import CartContainer from "../Cart/CartContainer";

const Navbar = () => {
    const [openNav, setOpenNav] = useState(false);
    const { auth } = useUser();

    const [openCart, setOpenCart] = useState(false);

    return (
        <nav className="flex transition-colors bg-white shadow-sm fixed w-full z-20 justify-between items-center  py-7 px-5 md:px-10">
            <Bars3Icon
                className="w-8 h-8 block md:hidden cursor-pointer"
                onClick={() => setOpenNav(true)}
            />

            <NavLogo />

            <NavList className="hidden gap-5 items-center md:flex" />

            <div className="flex gap-4 items-center">
                <ShoppingCartIcon
                    onClick={() => setOpenCart(true)}
                    className="h-6 w-6 text-black cursor-pointer"
                />
                {auth?.user ? (
                    <UserProfile />
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

            <CartContainer
                isOpen={openCart}
                onClose={() => setOpenCart(false)}
            />
        </nav>
    );
};

export default Navbar;
