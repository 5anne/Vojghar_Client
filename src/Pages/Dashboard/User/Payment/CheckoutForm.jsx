import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useCart from '../../../../hooks/useCart';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState();
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionID: paymentIntent.id,
                    date: new Date(), //moment.js for utc
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res);
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thanks for the Payment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/paymentHistory');
                }

            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            backgroundColor: '#345776',
                            color: '#FFFFFF',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        padding: '8px',
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className='flex justify-center'>
                <button type="submit" className='btn my-8 bg-slate-700 text-white' disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </div>
            <p className='text-center text-red-600'>{error}</p>
            {transactionId && <p className='text-center text-green-600'>Your Transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;