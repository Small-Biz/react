export interface Billboard{
    id: string;
    label: string;
    imageUrl: string;
}

export interface Category{
    id: string;
    name: string;
    billboard: Billboard;   
}

export interface Product{
    id: string;
    categoryId: string;
    name: string;
    description: string;
    imageList: Image[];
    price: string;    
    isFeatured: boolean;
}

export interface Image{
    id: string;
    url: string;
    thumbnail: boolean;
}

export interface Order{
    id: string;
    storeId: string;
    userId: string;
    name: string;
    orderItemList: OrderItem[];
    email: string;
    phone: string;
    billingAddress: string;
    shippingAddress: string;
    totalAmount: number;
    status: string;
    remark: string;
    createdAt: number;
    updatedAt: number;
}

export interface OrderItem{
    id:string;
    productId: string;
    productName: string;
    description: string;
    thumbnailUrl:string;
    price: number;
    quantity: number;
    netAmount: number;
    remark: string;
}