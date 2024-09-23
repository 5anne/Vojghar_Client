import React from 'react';
import { FaGoogle } from 'react-icons/fa6';

const GoogleLogin = () => {
    return (
        <div>
            <button className='btn font-bold'><FaGoogle></FaGoogle> Google</button>
        </div>
    );
};

export default GoogleLogin;