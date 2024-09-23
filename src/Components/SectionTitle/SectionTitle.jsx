import React from 'react';

const SectionTitle = ({ subHeading, heading }) => {
    return (
        <div className='md:w-1/3 mx-auto'>
            <p className='text-yellow-500 text-center my-4'>--- {subHeading} ---</p>
            <h1 className='uppercase text-3xl border-y-2 py-4 text-center'>{heading}</h1>
        </div>
    );
};

export default SectionTitle;