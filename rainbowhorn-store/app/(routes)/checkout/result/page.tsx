"use client";

import qs from "query-string"
import confirmPayment from "@/actions/confirm-payment";
import useCart from "@/hooks/use-cart";
import { useSearchParams } from "next/navigation";

const CheckoutResultPage = () => {

    const searchParams=useSearchParams();
    const current = qs.parse(searchParams.toString());
    const removeAll = useCart((state) => state.removeAll);

    // if (!current){
    //     return null;
    // }

    console.log('fetch');
    fetch(`http://localhost:8090/api/confirmpayment?referenceId=`+ current['payment_intent'])
    //const result = await confirmPayment();

    removeAll();

    return (
        <div>
            Checkout Success 2
        </div>
    )
}

export default CheckoutResultPage;