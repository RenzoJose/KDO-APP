import type { Inscripcion, InscripcionFormData } from '../modules/Inscripcion/types/InscripcionTypes';

const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Obtiene todas las inscripciones del servidor
 * @returns Promise con array de inscripciones
 * @throws Error si la petición falla
 */
export const getInscripciones = async (): Promise<Inscripcion[]> => {
    const response = await fetch(`${BASE_URL}/inscripciones`);
    if (!response.ok) {
        throw new Error('Error al cargar las inscripciones');
    }
    return response.json();
};

/**
 * Obtiene una inscripción específica por su ID
 * @param id - ID de la inscripción a obtener
 * @returns Promise con la inscripción solicitada
 * @throws Error si la petición falla
 */
export const getInscripcionById = async (id: string): Promise<Inscripcion> => {
    const response = await fetch(`${BASE_URL}/inscripciones/${id}`);
    if (!response.ok) {
        throw new Error('Error al cargar la inscripción');
    }
    return response.json();
};

/**
 * Crea una nueva inscripción con ID correlativo automático
 * @param data - Datos del formulario de inscripción
 * @returns Promise con la inscripción creada
 * @throws Error si la petición falla
 */
export const createInscripcion = async (data: InscripcionFormData): Promise<Inscripcion> => {
    // Obtener todas las inscripciones para calcular el siguiente ID correlativo
    const inscripciones = await getInscripciones();

    // Encontrar el ID máximo actual
    const maxId = inscripciones.reduce((max, inscripcion) => {
        const currentId = parseInt(inscripcion.id, 10);
        return currentId > max ? currentId : max;
    }, 0);

    // Generar el siguiente ID correlativo
    const nextId = (maxId + 1).toString();

    const response = await fetch(`${BASE_URL}/inscripciones`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: nextId,
            ...data,
            fechaInscripcion: new Date().toISOString(),
        }),
    });
    if (!response.ok) {
        throw new Error('Error al crear la inscripción');
    }
    return response.json();
};

/**
 * Actualiza una inscripción existente
 * @param id - ID de la inscripción a actualizar
 * @param data - Nuevos datos del formulario
 * @returns Promise con la inscripción actualizada
 * @throws Error si la petición falla
 */
export const updateInscripcion = async (id: string, data: InscripcionFormData): Promise<Inscripcion> => {
    // Obtener la inscripción actual para preservar fechaInscripcion
    const currentInscripcion = await getInscripcionById(id);

    const response = await fetch(`${BASE_URL}/inscripciones/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...data,
            id,
            fechaInscripcion: currentInscripcion.fechaInscripcion || new Date().toISOString(),
        }),
    });
    if (!response.ok) {
        throw new Error('Error al actualizar la inscripción');
    }
    return response.json();
};

/**
 * Elimina una inscripción
 * @param id - ID de la inscripción a eliminar
 * @returns Promise vacía
 * @throws Error si la petición falla
 */
export const deleteInscripcion = async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/inscripciones/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error al eliminar la inscripción');
    }
};
