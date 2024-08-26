import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

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
import ProductForm from "./components/admin/ProductForm";
import PrivateRoute from "./pages/PrivateRoute";
import RedirectIfAuthenticated from "./pages/RedirectIfAuthenticated";
import Wishlist from "./pages/Userview/Wishlist";

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
                {
                    path: "/wishlist",
                    element: (
                        <PrivateRoute requireRole="user">
                            <Wishlist />
                        </PrivateRoute>
                    ),
                },

                {
                    path: "/login",
                    element: (
                        <RedirectIfAuthenticated>
                            <Login />
                        </RedirectIfAuthenticated>
                    ),
                },
                {
                    path: "/register",
                    element: (
                        <RedirectIfAuthenticated>
                            <Register />
                        </RedirectIfAuthenticated>
                    ),
                },
            ],
        },

        {
            path: "/admin",
            element: (
                <PrivateRoute requireRole="admin">
                    <AdminLayout />
                </PrivateRoute>
            ),
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
                    element: <ProductForm />,
                },
                {
                    path: "create-product/:productId",
                    element: <ProductForm isUpdating={true} />,
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
            <Toaster
                position="bottom-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: { duration: 3000 },
                    error: { duration: 5000 },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                    },
                }}
            />
        </QueryClientProvider>
    );
};

export default App;
