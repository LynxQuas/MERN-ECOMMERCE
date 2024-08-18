import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ItemDetails from "./pages/ItemDetails";
import Error from "./components/ui/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserContextProvider from "./context/UserContext";
import AdminLayout from "./pages/AdminLayout";

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
                { path: "overview", element: <h1>Overview</h1> },
                { path: "orders", element: <h1>Orders Page</h1> },
                { path: "customers", element: <h1>Customers Page</h1> },
                { path: "products", element: <h1>Products Page</h1> },
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
