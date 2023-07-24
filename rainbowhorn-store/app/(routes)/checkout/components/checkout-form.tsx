"use client";

import Button from "@/components/ui/button";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { MouseEventHandler, useState } from "react";

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState(null);
    
    const onConfirmPayment: MouseEventHandler<HTMLButtonElement> = async (event)=>{
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        const {error} = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          confirmParams: {
            return_url: 'http://localhost:3000/checkout/result',
          },
        });
    
        if (error) {
          // This point will only be reached if there is an immediate error when
          // confirming the payment. Show error to your customer (for example, payment
          // details incomplete)
          setErrorMessage(error.message);
        } else {
          // Your customer will be redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer will be redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
        }
      };

    return (
        <form>
            <PaymentElement />
            <Button onClick={onConfirmPayment} disabled={!stripe}>Submit</Button>
        </form>
    )
}

export default CheckoutForm;