import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/featured.jpg'
import '../Featured/Featured.css'

const Featured = () => {
    return (
        <div className='featuredImage bg-fixed my-16'>
            <SectionTitle
                subHeading="check it out"
                heading="Featured item"
            ></SectionTitle>
            <div className='flex w-11/12 mx-auto p-10'>
                <div className='flex-1'>
                    <img className='w-[500px]' src={featuredImg} alt="" />
                </div>
                <div className='flex-1 space-y-2 text-white'>
                    <p>Aug 15, 2024</p>
                    <p className='uppercase'>where can i get some?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore accusantium quod saepe optio. Asperiores, cumque fuga. Suscipit assumenda ex consectetur dolor numquam nostrum maxime cupiditate aut recusandae doloribus beatae nesciunt voluptatum culpa est deserunt facilis, possimus error incidunt nam cum praesentium mollitia totam. Quis quod repellendus, voluptates maiores, odit rerum ipsum quam voluptate inventore reiciendis minus excepturi repellat tenetur adipisci.</p>
                    <button className='btn'>Find More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;