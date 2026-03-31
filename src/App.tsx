// importamos useState, que es una función nativa de React que gestiona la memoria de corto plazo
import { useState } from 'react';

// Luego importamos los componentes que creamos, y los tipos (participante y filtrado)
import RegistrationForm from './components/RegistrationForm';
import SearchFilters, { type FilterState } from './components/SearchFilters';
import ParticipantList from './components/ParticipantList';
import type { Participant } from './types';

// DATOS HARDCODEADOS: para que la lista no empiece vacia
const INITIAL_PARTICIPANTS: Participant[] = [
  {
    id: 1,
    nombre: "Lucas Martínez",
    email: "lucas@mail.com",
    edad: 22,
    pais: "Argentina",
    modalidad: "Presencial",
    tecnologias: ["React", "Node"],
    nivel: "Principiante",
    aceptaTerminos: true
  },
  {
    id: 2,
    nombre: "Sofía Rodríguez",
    email: "sofia@mail.com",
    edad: 28,
    pais: "Chile",
    modalidad: "Virtual",
    tecnologias: ["Python", "Java"],
    nivel: "Intermedio",
    aceptaTerminos: true
  },
  {
    id: 3,
    nombre: "Mateo García",
    email: "mateo@mail.com",
    edad: 35,
    pais: "México",
    modalidad: "Híbrido",
    tecnologias: ["Angular", "Vue"],
    nivel: "Avanzado",
    aceptaTerminos: true
  }
];

// Este archivo es el controlador principal de aplicación, le pasa los datos a todos los componentes.

export default function App() {

  // Vamos a ir guardando en memoria la variable participantes.
  // Ahora iniciamos el estado con INITIAL_PARTICIPANTS en lugar de un array vacío [].
  const [participants, setParticipants] = useState<Participant[]>(INITIAL_PARTICIPANTS);

  // Similarmente, guardamos en memoria los filtros que están puestos en la interfaz,
  // estos solo se pueden modificar a través de setFilters y se refrescará la interfaz cada
  // vez que se modifique (useState). 
  const [filters, setFilters] = useState<FilterState>({
    nombre: '',
    modalidad: '',
    nivel: ''
  });


  // Esta funcion llama a setParticipants para efectivamente guardar a un nuevo participante.
  // Se llama handleAddParticipant, y recibe un objeto con forma de participante pero omitiendo el id.
  const handleAddParticipant = (newParticipant: Omit<Participant, 'id'>) => {
    const participantWithId = {
      ...newParticipant,
      id: Date.now() // genera un id único basado en la fecha actual en milisegundos.
    };
    setParticipants([...participants, participantWithId]); // ejecuta setParticipants, le agrega el participante nuevo al arreglo y actualiza el estado.
  };

  // NUEVO: Función para eliminar un participante por su ID.
  // Utiliza filter para crear un nuevo array que excluye al participante con el ID especificado.
  const handleDeleteParticipant = (id: number) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  // filter participantes esta llamando a  vv esto vv , un método nativo de los arrays en JScript
  const filteredParticipants = participants.filter((p) => { // recorre cada participante (p)
    // recopila "trues" de la lista, cuando el nombre del participante del elemento que esta viendo incluye el input que pusieron de filtro
    const matchNombre = p.nombre.toLowerCase().includes(filters.nombre.toLowerCase()); 
    // lo mismo pero comparando modalidades, tiene true si no hay filtro de modalidad, o si el filtro coincide.
    const matchModalidad = filters.modalidad === '' || p.modalidad === filters.modalidad; 
    // lo mismo pero comparando niveles.
    const matchNivel = filters.nivel === '' || p.nivel === filters.nivel; 
    return matchNombre && matchModalidad && matchNivel; // devuelve solo a los elementos que en todas las comparaciones dieron true.
  });


  // Devuelve el código JSX que representa la interfaz de usuario. 
  // Un arbol de componentes que arma React.

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* h1) Título */}
      <h1 className="text-3xl font-bold text-center mb-6"> 
        Sistema de Registro de Eventos Tecnológicos 
      </h1> 
      
      {/* div) con el número de participantes registrados */}
      <div className="bg-blue-100 text-blue-800 p-3 rounded text-center mb-6 font-semibold">
        Participantes registrados: {participants.length}
      </div>

      {/* div) con 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* una columna  tiene el formulario de registro, con su titulo h2)*/}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4">Registro</h2>
          <RegistrationForm onAddParticipant={handleAddParticipant} />
        </div>

        {/* la otra columna tiene la lista de participantes, con su titulo h2, y la funcionalidad de filtrar*/}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Lista de Participantes</h2>
          <SearchFilters filters={filters} onFilterChange={setFilters} />
          
          {/* NUEVO: Se envía la función handleDeleteParticipant como prop al componente hijo */}
          <ParticipantList 
            participants={filteredParticipants} 
            onDeleteParticipant={handleDeleteParticipant} 
          />
        </div>
        
      </div>
    </div>
  );
}