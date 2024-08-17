import { useUser } from "../../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../libs/user";
import {
    UserCircleIcon,
    XMarkIcon,
    HeartIcon,
    ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

const UserProfile = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const dropdownRef = useClickOutside(() => setShowDropDown(false));
    const { auth, logout } = useUser();
    const { data } = useQuery({
        queryKey: ["user"],
        queryFn: () => getUserById(auth?.user?._id),
    });

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowDropDown((prev) => !prev)}
            >
                {data?.profileImage ? (
                    <img
                        src={data?.profileImage}
                        alt={data?.firstName}
                        className="w-8 h-8 rounded-full"
                    />
                ) : (
                    <UserCircleIcon className="w-8 h-8 text-gray-500" />
                )}
                <p className="font-medium text-gray-700">
                    {auth?.user?.firstName}
                </p>
            </div>

            {showDropDown && (
                <div className="absolute right-[-2rem] md:right-[-3rem] mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <ul className="p-4 flex flex-col gap-2">
                        <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                            <UserCircleIcon className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">Profile</span>
                        </li>
                        <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                            <ChartBarIcon className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">Dashboard</span>
                        </li>
                        <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                            <HeartIcon className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">Wishlist</span>
                        </li>
                        <li
                            onClick={logout}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                        >
                            <XMarkIcon className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">Logout</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
