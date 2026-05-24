import api from "../api";

export const getClients = async (params) => {
    try{
        const response = await api.get('/clientes',{
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