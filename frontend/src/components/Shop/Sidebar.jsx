import { NavLink } from "react-router-dom";
import { categories } from "../../constants";
import { cn } from "../../utils/clsx";

const Sidebar = ({ setProductName }) => {
    return (
        <aside className="w-[16rem] shrink-0 min-h-screen bg-[#eee] shadow-md hidden md:block">
            <div className="flex p-4 flex-col gap-10 fixed w-[16rem]">
                <input
                    type="text"
                    className="w-full px-4 py-2"
                    placeholder="Search products"
                    onChange={(e) => setProductName(e.target.value)}
                />

                <ul className="flex flex-col gap-2 font-semibold px-2  ">
                    {categories.map((c) => (
                        <li key={c.name}>
                            <NavLink
                                className={({ isActive }) =>
                                    cn(
                                        "py-2 rounded-md block w-[80%] px-7 transition-colors  hover:bg-gray-400 hover:text-white ",
                                        {
                                            "bg-gray-600 hover:bg-gray-600 text-white":
                                                isActive,
                                        }
                                    )
                                }
                                to={`/shop/${c.link}`}
                            >
                                {c.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
