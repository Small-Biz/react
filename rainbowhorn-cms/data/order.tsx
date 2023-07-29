import OrderItem from "./order-item";

type Order={
    id: string,
    storeId: string,
    userId: string,
    name: string,    
    orderItemList: OrderItem[],
    email: string,
    phone: string,
    billingAddress: string,
    shippingAddress: string,
    totalAmount: number,
    status: string,
    remark: string,
    createdAt: number,
    updatedAt: number,
}

export default Order;