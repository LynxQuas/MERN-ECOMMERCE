import { Outlet } from "react-router-dom";
import AdminNav from "../../components/Navigation/AdminNav";

const AdminLayout = () => {
    return (
        <>
            <header>
                <AdminNav />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default AdminLayout;
