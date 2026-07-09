import api from "../api";

export const getGroups = async (params) => {
    try{
        const response = await api.get(`/grupo-produto`,{
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