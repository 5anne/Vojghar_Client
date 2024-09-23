import React from 'react';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa6';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {

    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res.data);
        if (res.data.success) {
            const menuItem = {
                name: data.recipeName,
                recipe: data.details,
                image: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price)
            }
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.recipeName} has been added to menu successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

    }

    return (
        <>
            <SectionTitle subHeading="What's new?" heading="add an item"></SectionTitle>
            <div className='min-h-screen flex justify-center p-12'>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-100 h-full p-12'>
                    <label className='font-semibold'>Recipe Name*</label> <br />
                    <input {...register("recipeName", { required: true })} type='text' placeholder='Recipe Name' className="input rounded-none w-full mt-2" /> <br />
                    <div className='flex gap-4 my-2'>
                        <div className='flex-1'>
                            <label className='font-semibold'>Category*</label> <br />
                            <select defaultValue="value" {...register("category", { required: true })} className="input rounded-none w-full max-w-xs mt-2">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                        <div className='flex-1'>
                            <label className='font-semibold'>Price*</label> <br />
                            <input {...register("price", { required: true })} type='number' placeholder='Price' className="input rounded-none w-full mt-2" /> <br />
                        </div>
                    </div>
                    <label className='font-semibold'>Recipe Details*</label> <br />
                    <input {...register("details", { required: true })} type='text' placeholder='Recipe Details' className="input rounded-none h-40 w-full mt-2" /> <br />

                    <input {...register("image", { required: true })} type="file" className="file-input w-full my-4" />
                    <button type='submit' className='btn bg-gray-700 w-full text-white'>Add Item <FaUtensils></FaUtensils></button>
                </form>
            </div>
        </>
    );
};

export default AddItems;