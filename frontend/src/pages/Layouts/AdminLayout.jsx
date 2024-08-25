import { Link, Outlet } from "react-router-dom";
import AdminNav from "../../components/Navigation/AdminNav";
import { adminNav } from "../../constants";
import NavList from "../../components/Navigation/NavList";

const AdminLayout = () => {
    return (
        <>
            <header>
                <AdminNav />
            </header>
            <main className="flex">
                <aside className="w-[20rem] fixed top-0 left-0 h-full bg-purple-100 hidden lg:flex flex-col items-center py-10 shadow-lg">
                    <Link
                        to="/"
                        className="text-lg font-semibold mb-10 text-indigo-700 hover:underline"
                    >
                        Back to Home
                    </Link>
                    <NavList
                        className="flex flex-col gap-5"
                        navlists={adminNav}
                    />
                </aside>

                <div className="flex-grow lg:ml-[20rem] md:p-6 bg-gray-50 min-h-screen">
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default AdminLayout;
