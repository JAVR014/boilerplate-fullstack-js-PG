import { useState } from 'react';
import axios from 'axios';

export default function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/login', { email, password });
      setToken(res.data.token); // Guardar token en estado o localStorage
      alert("Bienvenido!");
    } catch (err) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <h2>Acceso Administrativo</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}