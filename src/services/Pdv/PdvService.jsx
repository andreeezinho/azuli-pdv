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

export const deleteProduct = async (uuid) => {
    try{
        const response = await api.delete('/pdv', {
            data: {
                uuid: uuid
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return response.data;
    }catch(error){
        throw error;
    }
}

export const deleteAllProducts = async (uuid) => {
    try{
        const response = await api.delete('/pdv/remove-all', {
            data: {
                venda_uuid: uuid
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return response.data;
    }catch(error){
        throw error;
    }
}