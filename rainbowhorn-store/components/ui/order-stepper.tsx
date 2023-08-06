import { CreditCard, Package, ShoppingCart, Truck, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderStepperProps{
    orderStatus:string|undefined;
}

const OrderStepper:React.FC<OrderStepperProps>=({
    orderStatus
})=> {
  const steps = [
    'Shopping',
    'Payment',
    'Dispatching',
    'Shipping',
    'Received',
  ];

  var activeStep=0;
  if (orderStatus==='PENDING'){
    activeStep=1;
  }else if (orderStatus==='PAID'){
    activeStep=2;
  }else if (orderStatus==='DISPATCHING'){
    activeStep=3;
  }else if (orderStatus==='SHIPPING'){
    activeStep=4;
  }else if (orderStatus==='DONE'){
    activeStep=5;
  }

  const iconStyle=(requiredStep:number)=>{
    return cn(
        "rounded-full",
        activeStep>=requiredStep?"bg-purple-500":"bg-gray-500",
        activeStep===requiredStep?"px-2 py-2":"px-1.5 py-1.5");
  }

  const separatorStyle=(requiredStep:number)=>{
    return cn(
        "w-1/12 h-1 rounded-full",
        activeStep>=requiredStep?"bg-purple-500":"bg-gray-500");
  }

  const labelStyle=(requiredStep:number)=>{
    return cn(
        "",
        activeStep>=requiredStep?"text-purple-500 font-bold":"",
        activeStep===requiredStep?"text-base":"text-sm");
  }

  return (
    <div className="mt-5">
        <div className="h-full w-full flex justify-center items-center gap-x-1">
            <div className="flex flex-col items-center">
                <div className={iconStyle(1)}><ShoppingCart className="text-white"/></div>
                <div className={labelStyle(1)}>{steps[0]}</div>            
            </div>            
            <div className={separatorStyle(2)}></div>
            <div className="flex flex-col items-center">
                <div className={iconStyle(2)}><CreditCard className="text-white"/></div>
                <div className={labelStyle(2)}>{steps[1]}</div>            
            </div>
            <div className={separatorStyle(3)}></div>
            <div className="flex flex-col items-center">
                <div className={iconStyle(3)}><Package className="text-white"/></div>
                <div className={labelStyle(3)}>{steps[2]}</div>            
            </div>
            <div className={separatorStyle(4)}></div>
            <div className="flex flex-col items-center">
                <div className={iconStyle(4)}><Truck className="text-white"/></div>
                <div className={labelStyle(4)}>{steps[3]}</div>            
            </div>
            <div className={separatorStyle(5)}></div>
            <div className="flex flex-col items-center">
                <div className={iconStyle(5)}><Users2 className="text-white"/></div>
                <div className={labelStyle(5)}>{steps[4]}</div>            
            </div>
        </div>

    </div>
  );
}

export default OrderStepper;