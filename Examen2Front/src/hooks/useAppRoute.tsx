import { useEffect, useState } from 'react';
import { GetAppRoutes } from '../services/AppRouterService';

export const useAppRoutes = () => {
  const [appRoutes, setAppRoutes] = useState<any[]>([]); // Asumo que appRoutes es un array de objetos con la estructura de tus rutas
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppRoutes = async () => {
      try {
        const routes = await GetAppRoutes();
        setAppRoutes(routes);
      } catch (error:any) {
        setError('Error fetching app routes: ' + error.message);
      }
    };

    fetchAppRoutes();
  }, []);

  return { appRoutes, error };
};