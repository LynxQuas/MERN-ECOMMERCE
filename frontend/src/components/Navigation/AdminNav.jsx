import { Link } from "react-router-dom";
import NavList from "./NavList";
import { adminNav } from "../../constants";
import { ArrowRightIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import MobileNav from "./MobileNav";

const AdminNav = () => {
    const [openNavMenu, setOpenNavMenu] = useState(false);
    return (
        <nav className="py-6 px-6 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Bars3Icon
                    className="w-10 h-10 md:hidden"
                    onClick={() => setOpenNavMenu(true)}
                />
                <h3 className="text-2xl font-bold text-purple-500">
                    Admin Dashboard
                </h3>
            </div>

            <NavList className="hidden md:flex gap-2" navlists={adminNav} />

            <Link
                to="/"
                className=" flex items-center text-sm gap-1 p-2 bg-gray-800 text-white  rounded-md hover:bg-gray-700 "
            >
                <span>Home</span>
                <ArrowRightIcon className="w-5 h-5" />
            </Link>
            {openNavMenu && (
                <MobileNav
                    onCloseNav={() => setOpenNavMenu(false)}
                    navlists={adminNav}
                />
            )}
        </nav>
    );
};

export default AdminNav;
