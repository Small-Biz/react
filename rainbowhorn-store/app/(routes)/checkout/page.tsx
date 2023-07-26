"use client";

import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./components/checkout-form";
import getPaymentIntent from "@/actions/get-payment-intent";
import { useParams, useSearchParams } from "next/navigation";
import qs from "query-string"
import Container from "@/components/ui/container";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51NX7ETETiVEeNlvPzSlV8WrcYPESuA30EMF5RohbfpGshjaa9KiYUekKWgGoe5dnDp7kvetbIAqGB0uV3wjRXx8W00mjfGjiT2');

const CheckoutPage = async () =>{
    
    const searchParams = useSearchParams();
    const params=useParams();

    const current = qs.parse(searchParams.toString());

    const options = {
        // passing the client secret obtained from the server
        clientSecret: current?.stripeSecret,
    };

    console.log(options);

    return (
        <Container>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </Container>
    )
}

export default CheckoutPage;