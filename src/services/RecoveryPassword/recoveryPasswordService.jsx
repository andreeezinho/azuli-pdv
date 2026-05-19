import api from "../api";

export const sendEmail = async (data) => {
    try {
        const response = await api.post(`/recuperar-senha/enviar-codigo`, data);

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const recoveryPassword = async (data) => {
    try {
        const response = await api.put(`/recuperar-senha`, data);

        return response.data;
    } catch (error) {
        throw error;
    }
}