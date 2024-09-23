import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {

    return (
        <div>
            <SectionTitle subHeading="pay first" heading="Payment"></SectionTitle>
            <div className="min-h-screen py-12 w-1/2 mx-auto">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;