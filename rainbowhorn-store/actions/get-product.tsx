import { Product } from "@/types";
import axios from "axios";

const URL = `http://localhost:8090/api/products`;

const getProduct = async (id: string): Promise<Product> => {

    const response=await axios.get(`${URL}/${id}`);
    return response.data.product;
};

export default getProduct;