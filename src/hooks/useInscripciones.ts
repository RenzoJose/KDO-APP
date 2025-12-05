import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/inscripcionesApi';
import type { InscripcionFormData } from '../modules/Inscripcion/types/InscripcionTypes';

export const useInscripciones = () => {
    return useQuery({
        queryKey: ['inscripciones'],
        queryFn: api.getInscripciones,
    });
};

export const useInscripcion = (id: string) => {
    return useQuery({
        queryKey: ['inscripciones', id],
        queryFn: () => api.getInscripcionById(id),
        enabled: !!id,
    });
};

export const useCreateInscripcion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.createInscripcion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inscripciones'] });
        },
    });
};

export const useUpdateInscripcion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: InscripcionFormData }) => api.updateInscripcion(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inscripciones'] });
        },
    });
};

export const useDeleteInscripcion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.deleteInscripcion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inscripciones'] });
        },
    });
};
