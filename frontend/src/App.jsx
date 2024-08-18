import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Error from "./components/ui/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserContextProvider from "./context/UserContext";
import Home from "./pages/Userview/Home";
import Shop from "./pages/Userview/Shop";
import ItemDetails from "./pages/Userview/ItemDetails";
import About from "./pages/Userview/About";
import Contact from "./pages/Userview/Contact";
import AdminLayout from "./pages/Layouts/AdminLayout";
import AppLayout from "./pages/Layouts/AppLayout";

import Overview from "./pages/Adminviews/Overview";
import Orders from "./pages/Adminviews/Orders";
import Customers from "./pages/Adminviews/Customers";
import Products from "./pages/Adminviews/Products";
import CreateProduct from "./pages/Adminviews/CreateProduct";

const queryClient = new QueryClient();

const App = () => {
    const router = createBrowserRouter([
        {
            element: <AppLayout />,
            children: [
                { path: "/", element: <Home /> },
                { path: "/shop", element: <Shop /> },
                { path: "/shop/:category", element: <Shop /> },
                {
                    path: "/shop/:category/:productId",
                    element: <ItemDetails />,
                },
                { path: "/about", element: <About /> },
                { path: "/contact", element: <Contact /> },
                { path: "/wishlist", element: <h1>Wishlists Page</h1> },
                { path: "/profile", element: <h1>Profile Page</h1> },
                { path: "/login", element: <Login /> },
                { path: "/register", element: <Register /> },
            ],
        },

        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                {
                    index: true,
                    element: <Navigate to="overview" replace />,
                },
                { path: "overview", element: <Overview /> },
                { path: "orders", element: <Orders /> },
                { path: "customers", element: <Customers /> },
                { path: "products", element: <Products /> },
                {
                    path: "create-product",
                    element: <CreateProduct />,
                },
            ],
        },

        {
            path: "*",
            element: <Error text={"Sorry Page Does Not Exist."} />,
        },
    ]);

    return (
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <RouterProvider router={router} />
            </UserContextProvider>
        </QueryClientProvider>
    );
};

export default App;
