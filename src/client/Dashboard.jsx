import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: '', cedula: '', size: '10kg', nozzleType: 'Rosca', quantity: 1
  });

  // Cargar datos al iniciar
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const res = await axios.get('http://localhost:3001/api/clients');
    setClients(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/api/clients', form);
    fetchClients(); // Recargar tabla
    alert("Registro agregado exitosamente");
  };

  return (
    <div className="dashboard">
      <h1>Control de Bombonas de Gas</h1>
      
      {/* --- Formulario de Subida --- */}
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
        <h3>Nuevo Registro</h3>
        <input 
          placeholder="Nombre Cliente" 
          onChange={e => setForm({...form, name: e.target.value})} 
          required 
        />
        <input 
          placeholder="Cédula" 
          onChange={e => setForm({...form, cedula: e.target.value})} 
          required 
        />
        
        <label>Tamaño:</label>
        <select onChange={e => setForm({...form, size: e.target.value})}>
          <option value="10kg">10 kg</option>
          <option value="18kg">18 kg</option>
          <option value="43kg">43 kg</option>
        </select>

        <label>Boquilla:</label>
        <select onChange={e => setForm({...form, nozzleType: e.target.value})}>
          <option value="Rosca">Rosca</option>
          <option value="Presión">Presión</option>
        </select>

        <input 
          type="number" min="1" 
          value={form.quantity}
          onChange={e => setForm({...form, quantity: e.target.value})} 
        />
        
        <button type="submit">Guardar Registro</button>
      </form>

      {/* --- Tabla de Visualización --- */}
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Cédula</th>
            <th>Detalle Bombonas (Tamaño - Boquilla - Cantidad)</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.cedula}</td>
              <td>
                <ul>
                  {client.cylinders.map(cyl => (
                    <li key={cyl.id}>
                      {cyl.size} - {cyl.nozzleType} ({cyl.quantity} und.)
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}