import axios from 'axios';
import { Method } from 'axios'
import { serverUrl } from '../config/generalConfig';



export default {
    get(endpoint: string, data?: any) {
        return request(endpoint, 'GET', data)
    },
    post(endpoint: string, data: any) {
        return request(endpoint, 'POST', data)
    },
    put(endpoint: string, data: any) {
        return request(endpoint, 'PUT', data)
    },
    delete(endpoint: string, data: any) {
        return request(endpoint, 'DELETE', data)
    }
}
const http = axios.create({
    withCredentials: true
})

const request = async (endpoint: string, method: Method = 'get', data?: any) => {
    try {
        const res = await http({
            url: `${serverUrl}${endpoint}`,
            method: method,
            data
        })
        return res.data;
    } catch (err) {
        console.error('Had Issues talking with the server');
        console.error(err.response);
        let message = "Had Issues talking with the server :( try to refresh the page!";
        switch (err?.response?.status) {
            case 404:
                message = "404! We where not able to find what you ask for :("
                break;
        }
        throw new Error(message);
    }
}

