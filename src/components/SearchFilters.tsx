import React from 'react';

export interface FilterState {
  nombre: string;
  modalidad: string;
  nivel: string;
}

interface SearchFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
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