import { useToast } from '@chakra-ui/react';
import { createTicket } from '../services/api';

export const useCreateTicket = () => {
    const toast = useToast();

    const handleSubmit = async (newTicket:any) => {
        try {
            const response = await createTicket(newTicket);
            if (response.status === 200 || response.status === 201) {
                toast({
                    title: 'Ticket created.',
                    description: "We've created your ticket for you.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            
            toast({
                title: 'Error.',
                description: "There is a limit of 10 passengers per day",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return {handleSubmit};
};
