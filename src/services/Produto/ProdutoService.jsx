import api from "../api";

export const getProducts = async (params) => {
    try{
        const response = await api.get(`/produtos`,{
            params: params,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        
        return response.data;
    }catch(error){
        throw error;
    }
}

export const createProduct = async (data) => {
    try{
        const response = await api.post(`/produtos`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        
        return response.data;
    }catch(error){
        throw error;
    }
}

export const updateProduct = async (data) => {
    try{
        const response = await api.put(`/produtos/${data.uuid}`, data, {
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
        const response = await api.put(`/produtos/${uuid}`, {ativo: 0}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        
        return response.data;
    }catch(error){
        throw error;
    }
}