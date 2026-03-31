import { type Participant } from '../types';

interface ParticipantCardProps {
  participant: Participant;
  onDelete: () => void; // NUEVO: Se agrega la función onDelete en las props
}

export default function ParticipantCard({ participant, onDelete }: ParticipantCardProps) {
  const getColorPorNivel = (nivel: string) => {
    switch (nivel) {
      case 'Principiante':
        return 'text-green-600';
      case 'Intermedio':
        return 'text-yellow-600';
      case 'Avanzado':
        return 'text-red-600';
      default:
        return 'text-gray-800';
    }
  };

  return (
    // Agregamos flex flex-col justify-between para empujar el botón hacia abajo
    <div className="bg-white shadow rounded p-4 hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold">{participant.nombre}</h3>
        <p className="text-gray-600">{participant.pais}</p>
        
        <div className="mt-4">
          <p className="text-sm">
            <span className="font-semibold">Modalidad:</span> {participant.modalidad}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Nivel:</span>{' '}
            <span className={`font-medium ${getColorPorNivel(participant.nivel)}`}>
              {participant.nivel}
            </span>
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm font-semibold mb-1">Tecnologías:</p>
          <p className="text-sm text-gray-700">
            {participant.tecnologias.join(' - ')}
          </p>
        </div>
      </div>

      {/* NUEVO: Botón de eliminar con estilos Tailwind */}
      <button 
        onClick={onDelete} // Ejecuta la función que pasamos desde ParticipantList
        className="mt-6 w-full text-center text-sm bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-600 hover:text-white transition-colors font-semibold"
      >
        Eliminar
      </button>
    </div>
  );
}