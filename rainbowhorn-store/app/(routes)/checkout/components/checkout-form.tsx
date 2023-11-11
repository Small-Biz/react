"use client";

import Button from "@/components/ui/button";
import { AddressElement, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { MouseEventHandler, useEffect, useState } from "react";

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        if (!stripe) {
          return;
        }
    
        const clientSecret = new URLSearchParams(window.location.search).get(
          "payment_intent_client_secret"
        );
    
        if (!clientSecret) {
          return;
        }
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
          switch (paymentIntent?.status) {
            case "succeeded":
              setMessage("Payment succeeded!");
              break;
            case "processing":
              setMessage("Your payment is processing.");
              break;
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.");
              break;
            default:
              setMessage("Something went wrong.");
              break;
          }
        });
      }, [stripe]);

    const onConfirmPayment: MouseEventHandler<HTMLButtonElement> = async (event)=>{
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        setIsLoading(true);

        const {error} = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          confirmParams: {
            return_url: 'http://localhost:3000/checkout/result',
          },
        });
    
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message?error.message:"");
          } else {
            setMessage("An unexpected error occurred.");
          }

        setIsLoading(false);
      };

        const paymentElementOptions = {
            layout: "tabs"
        }

    return (
        <form>
            <LinkAuthenticationElement
                id="link-authentication-element"
                onChange={(e) => setEmail(e.target.value)}
            />
            <h3>Shipping</h3>
            <AddressElement options={{
                mode: 'shipping',
                allowedCountries: ['GB','FR'],
                fields: {
                    phone: 'always',
                },
                validation: {
                  phone: {
                    required: 'always',
                  },
                },}} />
            <PaymentElement />
            <Button onClick={onConfirmPayment} disabled={isLoading || !stripe || !elements}>Submit</Button>

            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}

export default CheckoutForm;