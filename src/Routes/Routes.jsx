import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu";
import OurShop from "../Pages/Shop/OurShop";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PrivateRoute from "./PrivateRoute";
import Contact from "../Pages/Contact/Contact";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/User/Cart/Cart";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/Admin/AddItems/AddItems";
import AdminRoutes from "./AdminRoutes";
import ManageItems from "../Pages/Dashboard/Admin/ManageItems/ManageItems";
import UpdateItems from "../Pages/Dashboard/Admin/UpdateItems/UpdateItems";
import Payment from "../Pages/Dashboard/User/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/User/Payment/PaymentHistory";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome/AdminHome";
import UserHome from "../Pages/Dashboard/User/UserHome/UserHome";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/menu",
                element: <Menu></Menu>
            },
            {
                path: "/shop/:category",
                element: <OurShop></OurShop>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <Signup></Signup>
            },
            {
                path: "/contact",
                element: <PrivateRoute><Contact></Contact></PrivateRoute>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [

            //Admin
            {
                path: '/dashboard/adminHome',
                element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>
            },
            {
                path: '/dashboard/addItems',
                element: <AdminRoutes><AddItems></AddItems></AdminRoutes>
            },
            {
                path: '/dashboard/manageItems',
                element: <AdminRoutes><ManageItems></ManageItems></AdminRoutes>
            },
            {
                path: '/dashboard/updateItems/:id',
                element: <AdminRoutes><UpdateItems></UpdateItems></AdminRoutes>
            },
            {
                path: '/dashboard/allUsers',
                element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            },

            //User

            {
                path: '/dashboard/userHome',
                element: <UserHome></UserHome>
            },
            {
                path: '/dashboard/paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: '/dashboard/cart',
                element: <Cart></Cart>
            },
            {
                path: '/dashboard/payment',
                element: <Payment></Payment>
            }
        ]
    }
]);