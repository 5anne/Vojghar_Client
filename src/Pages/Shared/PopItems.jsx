import React from 'react';

const PopItems = ({ item }) => {
    const { image, name, recipe, category, price } = item;
    return (
        <div className='flex space-x-4'>
            <img style={{ borderRadius: '0 200px 200px 200px' }} className='w-20' src={image} alt="" />
            <div>
                <h1 className='uppercase'>{name} --------</h1>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-500 font-semibold'>${price}</p>
        </div>
    );
};

export default PopItems;