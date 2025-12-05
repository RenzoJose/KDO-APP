import { useQuery } from '@tanstack/react-query';

export interface Escuela {
    id: string;
    nombre: string;
    ciudad: string;
    pais: string;
}

const API_URL = 'http://localhost:3000';

const fetchEscuelas = async (): Promise<Escuela[]> => {
    const response = await fetch(`${API_URL}/escuelas`);
    if (!response.ok) {
        throw new Error('Error al obtener las escuelas');
    }
    return response.json();
};

export const useEscuelas = () => {
    return useQuery<Escuela[]>({
        queryKey: ['escuelas'],
        queryFn: fetchEscuelas,
    });
};
