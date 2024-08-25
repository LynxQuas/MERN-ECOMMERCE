import { Link } from "react-router-dom";

import { adminNav } from "../../constants";
import { ArrowRightIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import MobileNav from "./MobileNav";

const AdminNav = () => {
    const [openNavMenu, setOpenNavMenu] = useState(false);

    return (
        <nav className="py-6 px-6 shadow-md flex items-center justify-between md:flex lg:hidden">
            <div className="flex items-center">
                <Bars3Icon
                    className="w-10 h-10"
                    onClick={() => setOpenNavMenu(true)}
                />
            </div>

            <Link
                to="/"
                className=" flex items-center text-sm gap-1 p-3 bg-gray-800 text-white  rounded-md hover:bg-gray-700 "
            >
                <span>Back to Home</span>
                <ArrowRightIcon className="w-6 h-5" />
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
