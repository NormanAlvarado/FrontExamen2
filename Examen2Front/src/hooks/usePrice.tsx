import { useState, useEffect } from 'react';
import api from '../api/config';
import { useToast } from '@chakra-ui/react'

export const usePrice = (departure:number, destination:number) => {
    const [price, setPrice] = useState(0);
    const [error, setError] = useState(false);
    const toast = useToast()

    useEffect(() => {
        if (departure && destination) {
            
            async function GetPrice() {
                try {
                    const response = await api.get(`tickets/price?departurePlace=${departure}&destinationPlace=${destination}`);
                    
                    if (response.status === 200 || response.status === 201) {
                        setPrice(response.data);
                    } 

                } catch (error) {
                    setPrice(0)
                    toast({
                        title: 'Error.',
                        description: "You can't select the same places",
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
                              
            }
            GetPrice();
        }
    }, [departure, destination]);

    return {price, error};
};
