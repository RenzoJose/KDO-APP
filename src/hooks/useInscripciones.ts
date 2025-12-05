import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/inscripcionesApi';
import type { InscripcionFormData } from '../modules/Inscripcion/types/InscripcionTypes';

/**
 * Hook para obtener todas las inscripciones
 * Utiliza React Query para caché automático y gestión de estados
 * @returns Query con los datos de inscripciones, estados de carga y error
 */
export const useInscripciones = () => {
    return useQuery({
        queryKey: ['inscripciones'],
        queryFn: api.getInscripciones,
    });
};

/**
 * Hook para obtener una inscripción específica por ID
 * La consulta se ejecuta solo si se proporciona un ID válido
 * @param id - ID de la inscripción a obtener
 * @returns Query con los datos de la inscripción específica
 */
export const useInscripcion = (id: string) => {
    return useQuery({
        queryKey: ['inscripciones', id],
        queryFn: () => api.getInscripcionById(id),
        enabled: !!id, // Solo ejecuta la query si hay un ID
    });
};

/**
 * Hook para crear una nueva inscripción
 * Invalida automáticamente el caché de inscripciones al completarse con éxito
 * @returns Mutation con método mutate, estados y métodos auxiliares
 */
export const useCreateInscripcion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.createInscripcion,
        onSuccess: () => {
            // Invalida el caché para refrescar la lista automáticamente
            queryClient.invalidateQueries({ queryKey: ['inscripciones'] });
        },
    });
};

/**
 * Hook para actualizar una inscripción existente
 * Invalida automáticamente el caché de inscripciones al completarse con éxito
 * @returns Mutation que recibe objeto con id y data
 */
export const useUpdateInscripcion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: InscripcionFormData }) =>
            api.updateInscripcion(id, data),
        onSuccess: () => {
            // Invalida el caché para refrescar la lista automáticamente
            queryClient.invalidateQueries({ queryKey: ['inscripciones'] });
        },
    });
};

/**
 * Hook para eliminar una inscripción
 * Invalida automáticamente el caché de inscripciones al completarse con éxito
 * @returns Mutation con método mutate que recibe el ID a eliminar
 */
export const useDeleteInscripcion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.deleteInscripcion,
        onSuccess: () => {
            // Invalida el caché para refrescar la lista automáticamente
            queryClient.invalidateQueries({ queryKey: ['inscripciones'] });
        },
    });
};
