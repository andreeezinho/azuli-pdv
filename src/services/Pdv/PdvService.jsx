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
        console.log(response);
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

export const addPaymentMethod = async (data) => {
    try{
        const response = await api.post('/pdv/pagamento', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return response.data;
    }catch(error){
        throw error;
    }
}

export const getClientFromSale = async (venda_uuid) => {
    try{
        const response = await api.get(`/pdv/${venda_uuid}/cliente`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        
        return response.data;
    }catch(error){
        throw error;
    }
}

export const addClient = async (data) => {
    try{
        const response = await api.post('/pdv/vincular-cliente', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return response.data;
    }catch(error){
        throw error;
    }
}

export const removeClient = async (data) => {
    try{
        const response = await api.delete('/pdv/desvincular-cliente', {
            data: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return response.data;
    }catch(error){
        throw error;
    }
}

export const inWait = async (data) => {
    try{
        const response = await api.put('/pdv/em-espera', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return response.data;
    }catch(error){
        throw error;
    }
}

export const cancel = async (data) => {
    try{
        const response = await api.put('/pdv/cancelar', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return response.data;
    }catch(error){
        throw error;
    }
}

export const finish = async (data) => {
    try{
        const response = await api.put('/pdv/finalizar', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return response.data;
    }catch(error){
        throw error;
    }
}