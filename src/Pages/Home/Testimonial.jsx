import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import testimonial from '../../assets/feedback_13085477 (1).png'

const Testimonial = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div className='mb-20'>
            <SectionTitle
                subHeading="What Our Client Say"
                heading="testimonials"
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review =>
                        <SwiperSlide key={review._id}>
                            <div className='flex justify-center mt-8'>
                                <Rating style={{ maxWidth: 150 }} value={review.rating} readOnly />
                            </div>
                            <div className='flex justify-center mt-4'>
                                <img src={testimonial} alt="" />
                            </div>
                            <p className='text-center px-32 pt-8'>{review.details}</p>
                            <p className='text-center text-yellow-500 font-semibold text-xl'>{review.name}</p>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    );
};

export default Testimonial;