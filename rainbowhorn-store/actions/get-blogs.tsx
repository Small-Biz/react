import { Blog } from "@/types";
import axios from "axios";

const URL = `http://localhost:8090/api/blogs`;

const getBlogs = async(keyword:string): Promise<Blog[]> => {

//    const response = await axios.get(`${URL}/?keyword=${keyword}`);
const response = await axios.get(`${URL}`);
    return response.data.blogList;
    
};

export default getBlogs;