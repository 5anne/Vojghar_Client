import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';

const PaymentHistory = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: payments = [] } = useQuery({
        queryKey: ['payment', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })

    return (
        <>
            <SectionTitle subHeading="History" heading="Payment history"></SectionTitle>
            <div className="overflow-x-auto min-h-screen flex justify-center p-12">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-yellow-500'>
                            <tr>
                                <th>#</th>
                                <th>Price</th>
                                <th>TransactionID</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((item, index) =>
                                    <tr>
                                        <th>{index + 1}</th>
                                        <th>${item.price}</th>
                                        <td>{item.transactionID}</td>
                                        <td>{item.date}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PaymentHistory;