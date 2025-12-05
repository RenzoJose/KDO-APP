
import type { Inscripcion, InscripcionFormData } from "../types/InscripcionTypes";

// const API_URL = 'http://localhost:3001/inscripciones';
const API_URL = import.meta.env.VITE_BASE_URL


export const getInscripciones = async (): Promise<Inscripcion[]> => {

    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Error al cargar las inscripciones');
    }
    return response.json();
};

export const getInscripcionById = async (id: string): Promise<Inscripcion> => {
    console.log(`${API_URL}/${id}`);

    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Error al cargar la inscripción');
    }
    return response.json();
};

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

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: nextId,
            ...data,
            fechaInscripcion: new Date().toISOString()
        })
    });
    if (!response.ok) {
        throw new Error('Error al crear la inscripción');
    }
    return response.json();
};

export const updateInscripcion = async (id: string, data: InscripcionFormData): Promise<Inscripcion> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...data,
            id,
            fechaInscripcion: new Date().toISOString() // Optional: preserve original date if needed, but logic in HTML was new date
        })
    });
    if (!response.ok) {
        throw new Error('Error al actualizar la inscripción');
    }
    return response.json();
};

export const deleteInscripcion = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Error al eliminar la inscripción');
    }
};

