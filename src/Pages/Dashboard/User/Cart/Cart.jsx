import React from 'react';
import useCart from '../../../../hooks/useCart';
import { FaListAlt, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className='bg-slate-400 min-h-screen pt-8'>
            <div className='flex justify-evenly mb-8'>
                <h2 className='text-4xl'>Total Items: {cart.length}</h2>
                <h2 className='text-4xl'>Total Price: ${totalPrice}</h2>
                {
                    !cart.length ?
                        <button className='btn text-blue-800' disabled>Pay</button> :
                        <Link to='/dashboard/payment'><button className='btn text-blue-800'>Pay</button></Link>
                }

            </div>
            <div className="overflow-x-auto mx-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-black text-white'>
                            <th>
                                <FaListAlt></FaListAlt>
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart?.map((item, index) => <tr>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.image}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{item.name}</div>
                                </td>
                                <td>${item.price}</td>
                                <th>
                                    <button onClick={() => { handleDelete(item._id) }} className="btn btn-ghost btn-lg text-red-700"><FaTrash></FaTrash></button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;