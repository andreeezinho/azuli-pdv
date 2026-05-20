import api from "../api";

export const getUserSale = async () => {
    try{
        const response = await api.get('/pdv',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        
        return response.data;
    }catch(error){
        throw error;
    }
}

export const addProduct = async (uuid, data) => {
    try{
        console.log({
            ...data,
            venda_uuid: uuid
        });
        const response = await api.post('/pdv', {
            ...data,
            venda_uuid: uuid
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return response.data;
    }catch(error){
        throw error;
    }
}