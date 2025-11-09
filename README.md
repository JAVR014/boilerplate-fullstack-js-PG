# Plantilla de Aplicación Web Fullstack (React + Express)

Esta es una plantilla de repositorio para iniciar rápidamente un proyecto full-stack con un frontend de React y un backend de Express.js. Incluye una configuración base para facilitar el desarrollo, la gestión de variables de entorno y la interacción con la base de datos.

## ¿Cómo iniciar?

Para comenzar a trabajar con esta plantilla, sigue estos pasos:

1.  **Crea un fork del repositorio <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-forked mr-2">
    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
</svg>**



2.  **Clonar el repositorio**

    ```bash
    git clone https://github.com/arnaldoperez/boilerplate-fullstack-js
    cd boilerplate-fullstack-js
    ```

3.  **Instalar dependencias**

    Este proyecto utiliza una estructura que separa el cliente y el servidor. Para instalar todas las dependencias de una sola vez, ejecuta el siguiente comando desde la raíz del proyecto. Este script instalará las dependencias tanto para el servidor de Express como para el cliente de React.

    ```bash
    npm install
    ```

4.  **Configurar variables de entorno**

    El servidor utiliza variables de entorno para manejar configuraciones sensibles como credenciales de base de datos o claves de API.

    Crea un archivo `.env` en la raíz de la carpeta `server/`. Puedes usar el archivo `server/.env.example` como guía.

    ```dosini
    # Ejemplo de .env
    DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
    ```

    El proyecto usa `dotenv` para cargar estas variables automáticamente en `process.env`.

5.  **Ejecutar la aplicación en modo de desarrollo**

    Para iniciar tanto el servidor de backend como el cliente de frontend en modo de desarrollo con recarga en caliente (hot-reloading), ejecuta:

    ```bash
    npm run dev
    ```

    Esto iniciará el cliente de React (generalmente en `http://localhost:3000`) y el servidor de Express (generalmente en `http://localhost:5000` o el puerto que hayas configurado).

## Stack de Tecnologías

Esta plantilla integra las siguientes tecnologías para proporcionar una base sólida para tu aplicación:

*   **Frontend**:
    *   **React**: Una biblioteca de JavaScript para construir interfaces de usuario interactivas.
*   **Backend**:
    *   **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
    *   **Express.js**: Un framework minimalista para Node.js que facilita la creación de APIs y aplicaciones web.
*   **Base de Datos y ORM**:
    *   **Prisma**: Un ORM de próxima generación para Node.js y TypeScript. Facilita la interacción con tu base de datos mediante un esquema declarativo. Los archivos de `prisma` en el contexto sugieren su uso en este stack.
*   **Gestión de Entorno**:
    *   **Dotenv**: Un módulo para cargar variables de entorno desde un archivo `.env` a `process.env`, manteniendo la configuración separada del código.

### Integración

*   El cliente de React se comunica con el backend de Express a través de peticiones HTTP (API REST).
*   El servidor de Express maneja la lógica de negocio, se conecta a la base de datos a través de Prisma y responde a las peticiones del cliente.
*   Prisma gestiona el esquema de la base de datos, las migraciones y proporciona un cliente tipado para realizar consultas de forma segura.

## Estructura de Carpetas

El proyecto está organizado de la siguiente manera para mantener una clara separación de responsabilidades:

```
/
├── src/            # Contiene el código fuente de la aplicación
│  ├──assets/       # Archivos estáticos para el cliente React
│  │
│  ├─ client/       # Código fuente de la aplicación de React (Frontend)
│  │  └── App.js    # Punto de entrada de la aplicación React
│  │
│  ├─ server/       # Código fuente de la aplicación de Express (Backend)
│  │  └── index.js  # Punto de entrada de la aplicación Express
│  └─ .env.example  # Ejemplo de archivo de variables de entorno
├── prisma/         # Esquema de Prisma, migraciones y cliente generado
├── package.json    # Scripts y dependencias para la raíz del proyecto
└── README.md       # Instrucciones
```

*   `client/`: Todo el código relacionado con la interfaz de usuario de React.
*   `server/`: Todo el código del backend, incluyendo la lógica de la API, la configuración de la base de datos con Prisma y las rutas.
*   `package.json` (raíz): Contiene los scripts para gestionar el proyecto completo, como instalar dependencias o ejecutar ambos entornos (cliente y servidor) simultáneamente.

## Scripts Disponibles

Puedes usar los siguientes scripts desde la raíz del proyecto:

*   `npm install`: Instala las dependencias para el servidor y el cliente.
*   `npm run dev`: Inicia ambos servidores (frontend y backend) en modo de desarrollo. Ideal para trabajar en el proyecto. Soporta recarga automática al realizar cambios
*   `npm run server`: Inicia únicamente el servidor de backend.
*   `npm run client`: Inicia únicamente la aplicación de React.
*   `npm start`: Ejecuta el servidor en modo de producción. Este script generalmente se usa después de haber construido la aplicación de React.
*   `npm run build`: Construye la aplicación de React para producción. Los archivos generados se colocan en la carpeta `./dist`.
*   `npm run prisma:migrate:dev`: (Asumiendo el uso de Prisma) Crea y aplica una nueva migración en tu base de datos de desarrollo.
*   `npm run prisma:generate`: (Asumiendo el uso de Prisma) Genera o actualiza el Cliente de Prisma basado en tu esquema.
*   `npm run prisma:seed`: Ejecuta el script diseñado para la carga masiva de datos en tu base de datos. El script se encuentra en `prisma/seed.js`

---
