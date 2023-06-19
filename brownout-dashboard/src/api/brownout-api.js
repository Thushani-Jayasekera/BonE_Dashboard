import axios from 'axios';

const API_URL = 'ws://34.100.253.127:8000';

export const getASR = () => {
    return axios.get(`${API_URL}//variables/asr`);
};

export const getAMSR = () => {
    return axios.get(`${API_URL}//variables/amsr`);
};