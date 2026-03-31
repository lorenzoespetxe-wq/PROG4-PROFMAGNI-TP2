// Usamos TypeScript para definir la estructura de un "objeto" participante.
// En realidad, es una interfaz, no la instanciaremos ni tiene métodos o lógica.
// De esta manera, todos los participantes tendrán la misma estructura de datos.

// Se llama types.ts porque en proyectos más grandes, no tendríamos solo una interfaz en este archivo.

export interface Participant {
  id: number;
  nombre: string;
  email: string;
  edad: number;
  pais: string;
  modalidad: string;
  tecnologias: string[];
  nivel: string;
  aceptaTerminos: boolean;
}