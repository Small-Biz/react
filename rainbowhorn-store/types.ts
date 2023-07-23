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