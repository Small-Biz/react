import axios from "axios";

const URL = `http://localhost:8090/api/confirmpayment`;

const confirmPayment = async (referenceId: string): Promise<number> => {

    const response=await axios.get(`${URL}?referenceId=${referenceId}`);
    return response.data.result;
};

export default confirmPayment;