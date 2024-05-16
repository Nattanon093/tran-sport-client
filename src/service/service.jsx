import axios from "axios";

const getPosts = async () => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const getProvinceAndDistrictAndSubDistrict = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/v1/getProvinceAndDistrictAndSubDistrict`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const getDeliveryService = async (data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/v1/getDeliveryService`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const fitlerDataDelivery = async (data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/v1/fitlerDataDelivery`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const getParcelBoxSize = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/v1/getParcelBoxSize`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export default { getPosts, getProvinceAndDistrictAndSubDistrict, getDeliveryService, fitlerDataDelivery, getParcelBoxSize };