import { Category } from "@/types";
import axios from "axios";

const URL = `http://localhost:8090/api/17/categories`;

const getCategories = async (): Promise<Category[]> => {

    const response=await axios.get(URL);
    return response.data.categoryList;
};

export default getCategories;