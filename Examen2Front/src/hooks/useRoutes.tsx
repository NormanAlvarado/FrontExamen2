import { useQuery } from 'react-query';
import { getRoutes } from '../services/api';

export const useRoutes = () => {
    return useQuery('routes', getRoutes);
};
