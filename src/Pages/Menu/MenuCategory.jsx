import React from 'react';
import PopItems from '../Shared/PopItems';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title }) => {
    return (
        <div>
            <div className='grid grid-cols-2 gap-8 my-16'>
                {
                    items?.map(item => <PopItems key={item._id} item={item}></PopItems>)
                }
            </div>
            <Link to={`/shop/${title}`} className='flex justify-center mb-8'><button className='btn border-b-2 border-blue-950'>Order Now</button></Link>
        </div>
    );
};

export default MenuCategory;