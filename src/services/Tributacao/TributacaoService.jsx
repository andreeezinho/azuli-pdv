import api from "../api";

export const getTributacoes = async (params) => {
    try{
        const response = await api.get(`/tributacoes`,{
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