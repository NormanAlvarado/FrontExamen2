import api from '../api/config'

export type ticketProps = {
    id:number;
    date:string;
    departurePlace:number;
    destinationPlace:number;
    price:number;
}

export const createTicket = async (ticket:ticketProps) => {
    const data = await api.post('tickets', ticket).then(result => result.data);
    return data;
}

