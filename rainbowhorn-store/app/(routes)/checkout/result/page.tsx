"use client";

import qs from "query-string"
import confirmPayment from "@/actions/confirm-payment";
import useCart from "@/hooks/use-cart";
import { useSearchParams } from "next/navigation";
import Container from "@/components/ui/container";
import Button from "@/components/ui/button";

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
        <Container>
            <div className="p-4 sm:p-6 lg:p-8 overflow-hidden order-solid">
                <div  className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
                    <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                        <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                            Payment success
                        </div>
                        <div>
                            Your Order ID: {current['payment_intent']}
                        </div>
                        <span>
                            Your order are in progress. If you want to check the order status, you could go to <a className="text-sky-600">Order Details</a> page. 
                        </span>
                        <div>
                            <Button>
                                Go Shopping
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </Container>
    )
}

export default CheckoutResultPage;