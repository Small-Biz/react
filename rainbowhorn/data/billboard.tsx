import Store from "./store";

type Billboard={
    id: string;
    storeId: string;
    label: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}   

export default Billboard;