import { useQuery } from 'react-query';
import Navbar from '../Components/Navbar';
import { getRoutes } from '../services/RoutesService';
import { Select } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'



async function GetPrice(departure:number, destination:number) {
    const response = await axios.get(`https://localhost:7088/api/tickets/price?departurePlace=${departure}&destinationPlace=${destination}`);
    return response.data;
}

function TicketPage() {
    const toast = useToast()
    const { data: routes, isLoading, isError } = useQuery("route", getRoutes);
    const [price, setPrice] = useState(null);

    const {
        register,
        watch,
        formState: { errors },
    } = useForm();

    const departure = watch("departure");
    const destination = watch("destination");
    const date = watch("date");

    useEffect(() => {
        if (departure && destination) {
            GetPrice(departure, destination).then(newPrice => {
                setPrice(newPrice);
            }).catch(error => {
                console.error('Error fetching price:', error);
                setPrice('Error fetching price');
            });
        }
    }, [departure, destination]);

    async function handleSumbit() {
        const newTicket = {
            date: date,
            departurePlace: departure,
            destinationPlace: destination,
            price: 0
        }

        const response = await axios.post('https://localhost:7088/api/tickets', newTicket);
        if (response.status == 200 || response.status == 201) {

            toast({
                title: 'Ticket created.',
                description: "We've created your ticket for you.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <>
            <div>
                <Navbar />
                <div className='ml-10 mt-5'>
                    <h1 className='font-bold text-4xl'>Ticket Page</h1>
                    <p className='text-lg text-gray-500 mt-1'>To buy a ticket complete the form</p>
                </div>
                <div className='m-5 h-screen flex flex-col items-center'>

                    <div className='card flex flex-col justify-center items-center border p-10 shadow-xl mt-4 rounded-xl'>
                        <h4 className='mb-5 font-bold text-3xl'>Select the route you wish to travel</h4>
                        <div>
                            <Input placeholder='Basic usage' type='date' className='my-3' {...register("date")} />
                        </div>

                        <div className='flex gap-5'>
                            <div>
                                <Select placeholder='Select Departure point' {...register("departure")}>
                                    {routes.map((item:any) => (
                                        <option key={item.departurePlace} value={item.departurePlace}>{item.departurePlace}</option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <Select placeholder='Select Arrival point' {...register("destination")}>
                                    {routes.map((item:any) => (
                                        <option key={item.destinationPlace} value={item.destinationPlace}>{item.destinationPlace}</option>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        <h5 className='font-bold text-2xl my-6'>Price: ${price}</h5>

                        <Button colorScheme='teal' size='md' onClick={handleSumbit}>
                            Buy ticket
                        </Button>

                    </div>
                </div>
            </div>
        </>
    );
}

export default TicketPage;
