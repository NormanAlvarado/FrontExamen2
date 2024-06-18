import { useQuery } from 'react-query';
import { Select, Input, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useCreateTicket } from '../hooks/useCreateTicket';
import { usePrice } from '../hooks/usePrice';
import { getRoutes } from '../services/RoutesService';

function TicketPage() {
    const { handleSubmit: createTicket } = useCreateTicket();
    const toast = useToast();

    const { data: routes, isLoading, isError } = useQuery("route", getRoutes);

    const {
        register,
        watch,
        formState: { errors },
    } = useForm();

    const departure = watch("departure");
    const destination = watch("destination");
    const date = watch("date");

    const { price, error } = usePrice(departure, destination);

    useEffect(() => {
        if (error) {
            toast({
                title: 'Ticket was not created.',
                description: "You have to select different places",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            console.log(error);
        }
    }, [error, toast]);

    const handleFormSubmit = () => {
        const newTicket = {
            date: date,
            departurePlace: departure,
            destinationPlace: destination,
            price: 0 // Assuming price is set by usePrice hook
        };

        createTicket(newTicket);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div>
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
                                {routes.map((item:any, index:any) => (
                                    <option key={index} value={item.departurePlace}>{item.departurePlace}</option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <Select placeholder='Select Arrival point' {...register("destination")}>
                                {routes.map((item:any, index:any) => (
                                    <option key={index} value={item.destinationPlace}>{item.destinationPlace}</option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <h5 className='font-bold text-2xl my-6'>Price: ₡{price}</h5>

                    <Button colorScheme='teal' size='md' onClick={handleFormSubmit}>
                        Buy ticket
                    </Button>

                </div>
            </div>
        </div>
    );
}

export default TicketPage;
