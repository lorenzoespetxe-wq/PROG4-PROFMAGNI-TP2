import type { Participant } from '../types'; // importamos la forma de los participantes.
import ParticipantCard from './ParticipantCard'; // importamos el componente TarjetaParticipante.

interface ParticipantListProps {
  participants: Participant[]; // recibe como propiedad un array de participantes.
  onDeleteParticipant: (id: number) => void; // y una función para eliminar, que definimos en App.tsx.
}

// export para que esta función ParticipantList pueda ser usada por App.tsx.
// la funcion recibe las mismas propiedades, la lista de participantes y la función que elimina.
export default function ParticipantList({ participants, onDeleteParticipant }: ParticipantListProps) {
  // si no hay participantes...
  if (participants.length === 0) { 
    return ( //... muestra este mensaje:
      <p className="text-gray-500 text-center mt-8">
        No hay participantes registrados o que coincidan con la búsqueda.
      </p>
    );
  }
  
  // ... pero cuando hay participantes ...
  return ( // muestra una tarjeta por participante, con la función de eliminar.
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {participants.map((p) => (
        <ParticipantCard 
          key={p.id} 
          participant={p} 
          onDelete={() => onDeleteParticipant(p.id)} // pasamos el id a la funcion de eliminar.
        />
      ))}
    </div>
  );
}