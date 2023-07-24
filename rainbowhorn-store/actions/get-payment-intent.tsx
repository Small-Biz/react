import axios from "axios";

const URL = `http://localhost:8090/api/paymentintent`;

const getPaymentIntent = async (totalAmount: number): Promise<string> => {

    const response=await axios.post(`${URL}`, {
        totalAmount: totalAmount,
        featureRequest: "testing request"
    });
    return response.data.clientSecret;
};

export default getPaymentIntent;