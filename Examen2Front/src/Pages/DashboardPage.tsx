import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../services/DashboardService';

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

    
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (!data) {
      return <p>Error loading data</p>;
    }
    return (
        <>
        <Box p="6" flex="1">
        <Heading mb="6">Bienvenido al Dashboard</Heading>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="6">
          
          <Box bg="white" p="6" borderRadius="md" shadow="md">
            <Heading size="md" mb="2">Cantidad de pasajeros totales:</Heading>
            <Text>{data.totalPassengers}</Text>
          </Box>
          
        </SimpleGrid>
        <Box mt="6">
          <Heading size="lg" mb="4">Pasajeros por Ruta</Heading>
          {data.passengersPerRoute.length === 0 ? (
            <Text>No hay datos disponibles</Text>
          ) : (
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="6">
              {data.passengersPerRoute.map((routeData:any) => (
                <Box key={routeData.route} bg="white" p="6" borderRadius="md" shadow="md">
                  <Heading size="md" mb="2">{routeData.route}</Heading>
                  <Text>Pasajeros: {routeData.count}</Text>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
        <Box mt="6">
        <Heading size="lg" mb="4">Ingresos por Ruta</Heading>
        {data.revenuePerRoute.length === 0 ? (
          <Text>No hay datos disponibles</Text>
        ) : (
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="6">
            {data.revenuePerRoute.map((routeData:any) => (
              <Box key={routeData.route} bg="white" p="6" borderRadius="md" shadow="md">
                <Heading size="md" mb="2">{routeData.route}</Heading>
                <Text>Ingresos: ${routeData.revenue}</Text>
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