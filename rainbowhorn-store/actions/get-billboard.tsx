import { Billboard } from "@/types";
import axios from "axios";

const URL = `http://localhost:8090/api/billboards`;

const getBillboard = async (id: string): Promise<Billboard> => {

    const response=await axios.get(`${URL}/${id}`);
    return response.data.billboard;
};

export default getBillboard;