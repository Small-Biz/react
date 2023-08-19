type Product={
    id: string,
    storeId: string,
    categoryId: string,
    name: string,
    description: string,
    images:[],
    price: number,
    stock: number,
    isFeatured: boolean,
    createdAt: number,
    updatedAt: number
}

export default Product;