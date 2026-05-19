import api from "../api";

export const updateIcon = async (uuid, file) => {
    try{
        const response = await api.post(`/usuarios/${uuid}/icon`, 
            file, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        return response.data;
    }catch(error){
        throw error;
    }
}

export const update = async (uuid, data) => {
    try {
        const response = await api.put(`/usuarios/${uuid}`, data, {
            headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updatePassword = async (uuid, data) => {
    try {
        const response = await api.patch(`/usuarios/${uuid}/password`, data, {
            headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
}