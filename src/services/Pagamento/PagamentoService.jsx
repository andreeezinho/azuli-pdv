import api from "../api";

export const getPayments = async (params) => {
    try{
        const response = await api.get('/pagamentos',{
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