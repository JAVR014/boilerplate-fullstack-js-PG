import Express from "express";
import path from 'path';
import cors from 'cors'; // If you're using CORS
import { fileURLToPath } from 'url';
import app from "./src/server/index.js";
import dotenv from 'dotenv';
import process from 'process';

dotenv.config()
const port = process.env.PORT || 3000;


const server=Express()
server.use(cors())
server.use(Express.json())

server.use("/api",app)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from the React frontend build directory
const frontendBuildPath = path.resolve(__dirname, 'dist');
server.use('/', Express.static(frontendBuildPath));


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})