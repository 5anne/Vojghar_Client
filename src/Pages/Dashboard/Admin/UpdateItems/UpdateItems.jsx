import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';
import { FaUtensils } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItems = () => {

    const { register, handleSubmit } = useForm();

    const id = useParams().id;
    const idInt = parseInt(id);
    console.log(id);
    console.log(typeof (id));
    console.log(idInt);
    console.log(typeof (idInt));
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: item = [] } = useQuery({
        queryKey: ['item'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/menu/${id}`);
            console.log(res.data);
            return res.data;
        }
    });

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
            const menuRes = await axiosSecure.patch(`/menu/${id}`, menuItem);
            console.log(menuRes.data);
            if (menuRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.recipeName} has been updated to menu successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

    }

    return (
        <>
            <SectionTitle subHeading="What's new?" heading="update an item"></SectionTitle>
            <div className='min-h-screen flex justify-center p-12'>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-100 h-full p-12'>
                    <label className='font-semibold'>Recipe Name*</label> <br />
                    <input  {...register("recipeName")} type='text' defaultValue={item.name} placeholder='Recipe Name' className="input rounded-none w-full mt-2" /> <br />
                    <div className='flex gap-4 my-2'>
                        <div className='flex-1'>
                            <label className='font-semibold'>Category*</label> <br />
                            <select  {...register("category")} defaultValue={item.category} className="input rounded-none w-full max-w-xs mt-2">
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                        <div className='flex-1'>
                            <label className='font-semibold'>Price*</label> <br />
                            <input  {...register("price")} type='number' defaultValue={item.price} placeholder='Price' className="input rounded-none w-full mt-2" /> <br />
                        </div>
                    </div>
                    <label className='font-semibold'>Recipe Details*</label> <br />
                    <input  {...register("details")} type='text' defaultValue={item.recipe} placeholder='Recipe Details' className="input rounded-none h-40 w-full mt-2" /> <br />

                    <input  {...register("image")} type="file" className="file-input w-full my-4" />
                    <button type='submit' className='btn bg-gray-700 w-full text-white'>Add Item <FaUtensils></FaUtensils></button>
                </form>
            </div>
        </>
    );
};

export default UpdateItems;