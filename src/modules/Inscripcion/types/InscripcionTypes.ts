export interface Inscripcion {
    id: string;
    nombreEscuela: string;
    nombreAlumno: string;
    apellidoAlumno: string;
    documento: string;
    tipoDocumento: string;
    correoElectronico: string;
    edad: number;
    peso: number;
    gradoCinturon: string;
    fechaInscripcion?: string;
}

export type InscripcionFormData = Omit<Inscripcion, 'id' | 'fechaInscripcion'>;
