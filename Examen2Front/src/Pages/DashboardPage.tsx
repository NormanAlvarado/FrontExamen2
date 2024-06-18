import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../services/DashboardService';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useGetDate from '../hooks/useGetDate';

interface PassengersPerRoute {
  Route: string;
  Count: number;
}

interface RevenuePerRoute {
  Route: string;
  Revenue: number;
}

interface DashboardData {
  totalPassengers: number;
  passengersPerRoute: PassengersPerRoute[];
  revenuePerRoute: RevenuePerRoute[];
}

const DashboardPage: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DashboardData | null>(null);
  

  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  
  const { fechas } = useGetDate(startDate, endDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPassengers = fechas.length;
  const totalRevenue = fechas.reduce((sum:any, ticket:any) => sum + ticket.price, 0);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Error loading data</p>;
  }
  return (
    <>


      <Box p="6" flex="1">
        <Heading mb="6">Welcome to the Dashboard</Heading>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="6">

          <Box bg="white" p="6" borderRadius="md" shadow="md">
            <Heading size="md" mb="2">Total passengers amount:</Heading>
            <Text>{data.totalPassengers}</Text>
          </Box>

        </SimpleGrid>
        <Box >
          <Heading>Select a date range</Heading>
          <div className='flex gap-5 mt-4'>
            <Input placeholder='Basic usage' type='date' {...register('startDate')} />
            <Input placeholder='Basic usage' type='date' {...register('endDate')} />
          </div>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="6">
            <Box bg="white" p="6" borderRadius="md" shadow="md">
              <Heading size="md" mb="2">Total passengers:</Heading>
              <Text>{totalPassengers}</Text>
            </Box>
            <Box bg="white" p="6" borderRadius="md" shadow="md">
              <Heading size="md" mb="2">total earnings:</Heading>
              <Text>₡{totalRevenue}</Text>
            </Box>
          </SimpleGrid>
        </Box>
        <Box mt="6">
          <Heading size="lg" mb="4">Passengers per route</Heading>
          {data.passengersPerRoute.length === 0 ? (
            <Text>No information available</Text>
          ) : (
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="6">
              {data.passengersPerRoute.map((routeData: any) => (
                <Box key={routeData.route} bg="white" p="6" borderRadius="md" shadow="md">
                  <Heading size="md" mb="2">{routeData.route}</Heading>
                  <Text>Passengers: {routeData.count}</Text>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
        <Box mt="6">
          <Heading size="lg" mb="4">Earnings per route</Heading>
          {data.revenuePerRoute.length === 0 ? (
            <Text>No information available</Text>
          ) : (
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="6">
              {data.revenuePerRoute.map((routeData: any) => (
                <Box key={routeData.route} bg="white" p="6" borderRadius="md" shadow="md">
                  <Heading size="md" mb="2">{routeData.route}</Heading>
                  <Text>Earnings: ₡{routeData.revenue}</Text>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Box>





    </>
  );
};

export default DashboardPage;