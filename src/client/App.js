const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

const SECRET_KEY = "tu_secreto_super_seguro"; // Mover a .env

// --- 1. Endpoint de LOGIN ---
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    // Verificar contraseña (asumiendo que está hasheada)
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

    // Generar Token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '8h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// --- 2. Endpoint: Guardar Cliente y Bombonas ---
app.post('/api/clients', async (req, res) => {
  const { name, cedula, size, nozzleType, quantity } = req.body;

  try {
    // Usamos 'upsert' para: Si el cliente existe, le agregamos bombonas.
    // Si no existe, lo creamos junto con las bombonas.
    const result = await prisma.client.upsert({
      where: { cedula: cedula },
      update: {
        cylinders: {
          create: { size, nozzleType, quantity: parseInt(quantity) }
        }
      },
      create: {
        name,
        cedula,
        cylinders: {
          create: { size, nozzleType, quantity: parseInt(quantity) }
        }
      }
    });
    
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar datos" });
  }
});

// --- 3. Endpoint: Mostrar Datos ---
app.get('/api/clients', async (req, res) => {
  const clients = await prisma.client.findMany({
    include: { cylinders: true } // Incluir la relación para ver las bombonas
  });
  res.json(clients);
});

app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'));