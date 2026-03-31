import React from 'react';

// Creamos una interfaz FilterState recibe 3 strings, que son los que usamos para filtrar.
export interface FilterState {
  nombre: string;
  modalidad: string;
  nivel: string;
}

// Creamos otra interfaz:
interface SearchFiltersProps {
  filters: FilterState; // esta recibe el estado de los filtros (1ra interfaz)
  onFilterChange: (filters: FilterState) => void; // y una funcion que actualizará el estado de los filtros, que definimos en App.tsx.
}

// Definimos funcion SearchFilters exportable para que la use App.tsx
export default function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {

  // "e" es un objeto que genera el navegador cuando interactuamos con un elemento,
  // puede venir de un HTMLinput o HTMLselect
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // extraemos de el evento (e.targent) el name (nombre, modalidad o nivel (uno de los filtros)) 
    // y el value (que nombre, que modalidad o que nivel se esta usando para filtrar)
    const { name, value } = e.target;
    // cuando se cambia el filtro, usa name como clave para saber que value cambiar
    // y manda un nuevo FilterState con ese cambio.
    onFilterChange({ ...filters, [name]: value }); 
  };


  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex flex-col">
        <label>Buscar:</label>
        <input
          type="text"
          name="nombre"
          value={filters.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Nombre..."
        />
      </div>
      
      <div className="flex flex-col">
        <label>Modalidad:</label>
        <select 
          name="modalidad" 
          value={filters.modalidad} 
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Todas</option>
          <option value="Presencial">Presencial</option>
          <option value="Virtual">Virtual</option>
          <option value="Híbrido">Híbrido</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label>Nivel:</label>
        <select 
          name="nivel" 
          value={filters.nivel} 
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Todos</option>
          <option value="Principiante">Principiante</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>
      </div>
    </div>
  );
}