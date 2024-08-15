import NavList from "./NavList";
import { XMarkIcon } from "@heroicons/react/24/outline";

const MobileNav = ({ onCloseNav }) => {
    return (
        <div className="fixed inset-0 z-20 flex">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black opacity-50 z-10"
                onClick={onCloseNav}
            />

            {/* Navigation Panel */}
            <div
                className={`w-[80%] bg-white h-screen z-20 absolute animate-slideIn px-7`}
            >
                <XMarkIcon
                    className="w-10 h-10 absolute top-0 right-0 my-2 mx-4"
                    onClick={onCloseNav}
                />
                <NavList
                    className="flex  flex-col gap-7 text-xl px-4 py-20"
                    onCloseNav={onCloseNav}
                />
            </div>
        </div>
    );
};

export default MobileNav;
