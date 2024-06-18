import api from '../api/config'

export const getRoutes = async () => {
    const data = await api.get('route').then(result => result.data);
    return data;
}

