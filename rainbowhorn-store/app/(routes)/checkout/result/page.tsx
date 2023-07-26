"use client";

import qs from "query-string"
import confirmPayment from "@/actions/confirm-payment";
import useCart from "@/hooks/use-cart";
import { useSearchParams } from "next/navigation";

const CheckoutResultPage = async () => {

    const searchParams=useSearchParams();
    const current = qs.parse(searchParams.toString());

    if (!current){
        return null;
    }

    //FIXME
    const result = await confirmPayment(current['payment_intent']);

    //const cart=useCart();
    //cart.removeAll();

    return (
        <div>
            Checkout Success 2
        </div>
    )
}

export default CheckoutResultPage;