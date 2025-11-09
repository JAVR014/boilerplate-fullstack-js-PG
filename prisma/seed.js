import {  PrismaClient } from '@prisma/client'
import process from 'process'

const prisma = new PrismaClient()

// Función de carga de datos
async function seedRecipes() {
  const data=[{name:"test", role: "admin"}]
  await prisma.myTable.createMany(data)
}

// Se ejecutan varias funciones de carga de data en simultaneo

Promise.all([seedRecipes(), seedRecipes()]).then(() =>{
  console.log("Done")
  process.exit(0)
}).catch(e=>{
  console.log(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})