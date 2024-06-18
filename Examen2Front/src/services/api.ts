import axios from 'axios';

export const getRoutes = async () => {
    const response = await axios.get('https://localhost:7088/api/routes');
    return response.data;
};

export const getPrice = async (departure:number, destination:number) => {
    const response = await axios.get(`https://localhost:7088/api/tickets/price?departurePlace=${departure}&destinationPlace=${destination}`);
    return response.data;
};

export const createTicket = async (newTicket:any) => {
    const response = await axios.post('https://localhost:7088/api/tickets', newTicket);
    return response;
};
