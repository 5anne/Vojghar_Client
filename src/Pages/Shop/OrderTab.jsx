import React from 'react';
import FoodCard from '../../Components/FoodCard/FoodCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const OrderTab = ({ items }) => {

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (
        <Swiper
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className='grid grid-cols-3 gap-8'>
                    {
                        items?.map(item => <FoodCard items={item}></FoodCard>)
                    }
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default OrderTab;