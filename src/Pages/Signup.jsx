import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';
import GoogleLogin from '../Components/SocialLogin/googleLogin';
import useAuth from '../hooks/useAuth';

const Signup = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { createUser, updateUserProfile, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Created Successfully!",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(res => {
                console.log(res.user.displayName);
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
            })
    }

    return (
        <>
            <Helmet>
                <title>Vojghar || Sign up</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                                {errors.name && <span className='text-red-500 mt-2'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoURL</span>
                                </label>
                                <input type="url" {...register("photo", { required: true })} placeholder="PhotoURL" className="input input-bordered" />
                                {errors.photo && <span className='text-red-500 mt-2'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-500 mt-2'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true, minLength: 8, maxLength: 20 })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className='text-red-500 mt-2'>This field is required</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-500 mt-2'>Password must be at least 8 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className='text-red-500 mt-2'>Password must be at least 20 characters</span>}
                                {/* {errors.password?.type === 'pattern' && <span className='text-red-500 mt-2'>Password must have one uppercase, one lower case and one special characters</span>} */}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                {/* <input className="btn btn-primary" type="submit" value="Sign Up" /> */}
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                            <p>Already have an account? Please <Link to="/login" className='to-blue-800 hover:underline'>login</Link></p>
                            <div onClick={handleGoogleLogin}><GoogleLogin></GoogleLogin></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;