import { Category } from "@/types";
import axios from "axios";

const URL = `http://localhost:8090/api/categories`;

const getCategory = async (id:string): Promise<Category> => {

    const response=await axios.get(`${URL}/${id}`);
    return response.data.category;
};

export default getCategory;