import { NavLink } from "react-router-dom";
import { mainNav } from "../../constants";
import { cn } from "../../utils/clsx";

const NavList = ({ className, onCloseNav }) => {
    return (
        <ul className={className}>
            {mainNav.map((nav) => (
                <li key={nav.link} onClick={onCloseNav}>
                    <NavLink
                        to={nav.link}
                        className={({ isActive }) =>
                            cn(
                                "font-semibold hover:bg-purple-400 block text-center rounded-md hover:text-white py-3 px-6 transition-colors duration-100 ease-in",
                                {
                                    "bg-purple-500 hover:bg-purple-500 text-white":
                                        isActive,
                                }
                            )
                        }
                    >
                        {nav.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default NavList;
