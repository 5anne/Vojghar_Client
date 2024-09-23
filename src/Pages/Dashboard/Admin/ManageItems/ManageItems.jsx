import React from 'react';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';
import useMenu from '../../../../hooks/useMenu';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import UpdateItems from '../UpdateItems/UpdateItems';

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDeleteButton = (item) => {
        console.log(item);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                    });
                }
            }
        }
        )
            .catch(error => console.error(error))
    }


    return (
        <>
            <SectionTitle subHeading="Hurry Up" heading="Manage all items"></SectionTitle>
            <div className="overflow-x-auto min-h-screen flex justify-center p-12">
                <table className="table bg-black">
                    <thead className='bg-slate-600 text-gray-300 font-bold'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='text-white'>
                        {
                            menu?.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
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
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <th>
                                    <Link to={`/dashboard/updateItems/${item._id}`}><button className="btn btn-ghost btn-lg text-teal-800"><FaEdit></FaEdit></button></Link>
                                </th>
                                <th>
                                    <button onClick={() => { handleDeleteButton(item) }} className="btn btn-ghost btn-lg text-red-800"><FaTrashAlt></FaTrashAlt></button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ManageItems;