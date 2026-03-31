import { useState } from 'react';
import { type Participant } from '../types';

interface RegistrationFormProps {
  onAddParticipant: (participant: Omit<Participant, 'id'>) => void;
}

export default function RegistrationForm({ onAddParticipant }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    edad: '',
    pais: 'Argentina',
    modalidad: 'Presencial',
    tecnologias: [] as string[],
    nivel: 'Principiante',
    aceptaTerminos: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, tecnologias: [...formData.tecnologias, value] });
    } else {
      setFormData({
        ...formData,
        tecnologias: formData.tecnologias.filter((tech) => tech !== value),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.aceptaTerminos) return;

    onAddParticipant({
      ...formData,
      edad: Number(formData.edad),
    });

    setFormData({
      nombre: '',
      email: '',
      edad: '',
      pais: 'Argentina',
      modalidad: 'Presencial',
      tecnologias: [],
      nivel: 'Principiante',
      aceptaTerminos: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 shadow rounded">
      
      <div className="flex flex-col">
        <label>Nombre</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required className="border p-2 rounded" />
      </div>

      <div className="flex flex-col">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="border p-2 rounded" />
      </div>

      <div className="flex flex-col">
        <label>Edad</label>
        <input type="number" name="edad" value={formData.edad} onChange={handleInputChange} required className="border p-2 rounded" />
      </div>

      <div className="flex flex-col">
        <label>País</label>
        <select name="pais" value={formData.pais} onChange={handleInputChange} className="border p-2 rounded">
          <option value="Argentina">Argentina</option>
          <option value="Chile">Chile</option>
          <option value="Uruguay">Uruguay</option>
          <option value="México">México</option>
          <option value="España">España</option>
        </select>
      </div>

      <div className="flex flex-col col-span-1 md:col-span-2">
        <label>Modalidad de asistencia</label>
        <div className="flex gap-4">
          <label><input type="radio" name="modalidad" value="Presencial" checked={formData.modalidad === 'Presencial'} onChange={handleInputChange} /> Presencial</label>
          <label><input type="radio" name="modalidad" value="Virtual" checked={formData.modalidad === 'Virtual'} onChange={handleInputChange} /> Virtual</label>
          <label><input type="radio" name="modalidad" value="Híbrido" checked={formData.modalidad === 'Híbrido'} onChange={handleInputChange} /> Híbrido</label>
        </div>
      </div>

      <div className="flex flex-col col-span-1 md:col-span-2">
        <label>Tecnologías conocidas</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {['React', 'Angular', 'Vue', 'Node', 'Python', 'Java'].map((tech) => (
            <label key={tech}>
              <input type="checkbox" value={tech} checked={formData.tecnologias.includes(tech)} onChange={handleCheckboxChange} /> {tech}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <label>Nivel de experiencia</label>
        <select name="nivel" value={formData.nivel} onChange={handleInputChange} className="border p-2 rounded">
          <option value="Principiante">Principiante</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>
      </div>

      <div className="flex flex-col col-span-1 md:col-span-2">
        <label>
          <input type="checkbox" name="aceptaTerminos" checked={formData.aceptaTerminos} onChange={(e) => setFormData({ ...formData, aceptaTerminos: e.target.checked })} required /> Acepto los términos y condiciones del evento
        </label>
      </div>

      <div className="col-span-1 md:col-span-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto">
          Registrar Participante
        </button>
      </div>
    </form>
  );
}