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