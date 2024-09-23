import React from 'react';
import { FaBook, FaCalendar, FaComment, FaHome, FaList, FaMoneyBill, FaPhone, FaSearch, FaShoppingCart, FaUsers, FaUtensilSpoon } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {

    const [isAdmin] = useAdmin();

    return (
        <div className='flex'>
            <div className='w-64 min-h-screen bg-orange-300'>
                <ul className='menu p-4 gap-4'>
                    {
                        isAdmin ?
                            <>

                                <li>
                                    <NavLink to="/dashboard/adminHome">
                                        <FaHome></FaHome> Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addItems">
                                        <FaUtensilSpoon></FaUtensilSpoon> Add Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageItems">
                                        <FaList></FaList> Manage Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaBook></FaBook> Manage Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allUsers">
                                        <FaUsers></FaUsers> All Users
                                    </NavLink>
                                </li>
                                <div className='divider'></div>
                                <li>
                                    <NavLink to="/">
                                        <FaHome></FaHome> Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/menu">
                                        <FaSearch></FaSearch> Our Menu
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/shop/salad">
                                        <FaShop></FaShop> Our Shop
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/contact">
                                        <FaPhone></FaPhone> Contact Us
                                    </NavLink>
                                </li>

                            </> :
                            <>

                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome> User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation">
                                        <FaCalendar></FaCalendar> Reservation
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory">
                                        <FaMoneyBill></FaMoneyBill> Payment History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart> My Cart
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <FaComment></FaComment> Add Review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/booking">
                                        <FaList></FaList> My Booking
                                    </NavLink>
                                </li>
                                <div className='divider'></div>
                                <li>
                                    <NavLink to="/">
                                        <FaHome></FaHome> Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/menu">
                                        <FaSearch></FaSearch> Our Menu
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/shop/salad">
                                        <FaShop></FaShop> Our Shop
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/contact">
                                        <FaPhone></FaPhone> Contact Us
                                    </NavLink>
                                </li>

                            </>
                    }
                </ul>
            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;