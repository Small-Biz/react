type Product={
    id: string,
    storeId: string,
    categoryId: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    isFeatured: boolean,
    createdAt: number,
    updatedAt: number
}

export default Product;