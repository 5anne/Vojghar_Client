import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';

import slide1 from "../../assets/slide1.jpg"
import slide2 from "../../assets/slide2.jpg"
import slide3 from "../../assets/slide3.jpg"
import slide4 from "../../assets/slide4.jpg"
import slide5 from "../../assets/slide5.jpg"

const Category = () => {
    return (
        <div>
            <SectionTitle
                subHeading="From 10.00 AM to 10.00 PM"
                heading="order online"
            ></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper my-12"
            >
                <SwiperSlide>
                    <img src={slide1} alt="" />
                    <p className='text-center uppercase font-semibold text-2xl text-white -mt-24'>Salad</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="" />
                    <p className='text-center uppercase font-semibold text-2xl text-white -mt-24'>Pizza</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} alt="" />
                    <p className='text-center uppercase font-semibold text-2xl text-white -mt-24'>Soup</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} alt="" />
                    <p className='text-center uppercase font-semibold text-2xl text-white -mt-24'>Cake</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} alt="" />
                    <p className='text-center uppercase font-semibold text-2xl text-white -mt-24'>Salad</p>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Category;