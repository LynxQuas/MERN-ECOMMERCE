import { Outlet } from "react-router-dom";
import Navbar from "../components/Navigation/Navbar";

const AppLayout = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main className="bg-[#f2f2f2] min-h-screen min-w-screen pt-24">
                <Outlet />
            </main>
        </>
    );
};

export default AppLayout;
