import type { Participant } from '../types';
import ParticipantCard from './ParticipantCard';

interface ParticipantListProps {
  participants: Participant[];
  onDeleteParticipant: (id: number) => void; // Se agrega la firma de la función
}

export default function ParticipantList({ participants, onDeleteParticipant }: ParticipantListProps) {
  if (participants.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-8">
        No hay participantes registrados o que coincidan con la búsqueda.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {participants.map((p) => (
        <ParticipantCard 
          key={p.id} 
          participant={p} 
          onDelete={() => onDeleteParticipant(p.id)} // Se ejecuta la función pasando el ID del participante
        />
      ))}
    </div>
  );
}