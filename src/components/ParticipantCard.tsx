import { type Participant } from '../types'; // importamos la forma de los participantes.

interface ParticipantCardProps {
  participant: Participant; // recibe un "objeto" como propiedad.
  onDelete: () => void; // y la función de borrar.
}

// export para que esta función ParticipantCard pueda ser usada por 
// ParticipantList, que a su vez es usada por App.tsx.
export default function ParticipantCard({ participant, onDelete }: ParticipantCardProps) {

  // Logica de el color de el texto de nivel, 
  // recibe el string de nivel,
  // devuelve String de el color a usar.
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

  // siempre devuelve la tarjeta, con la info dependiendo 
  // de el participante que recibió como propiedad.
  return (
    <div className="bg-white shadow rounded p-4 hover:shadow-lg transition flex flex-col justify-between">
      <div>
        {/* Sección de Nombre y País */}
        <h3 className="text-xl font-bold">{participant.nombre}</h3>
        <p className="text-gray-600">{participant.pais}</p>
        
        {/* Sección de Modalidad y Nivel */}
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

        {/* Sección de Tecnologías */}
        <div className="mt-4">
          <p className="text-sm font-semibold mb-1">Tecnologías:</p>
          <p className="text-sm text-gray-700">
            {participant.tecnologias.join(' - ')}
          </p>
        </div>
      </div>

      {/* button) Botón de eliminar */}
      <button 
        onClick={onDelete} // Cuando clickeas ejecuta la función que pasamos desde ParticipantList
        className="mt-6 w-full text-center text-sm bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-600 hover:text-white transition-colors font-semibold"
      >
        Eliminar
      </button>
    </div>
  );
}