# Creador y gestion de tareas

Este proyecto es un gestor de tareas cortas diseñado para facilitar la organización y seguimiento eficiente de tareas pendientes. Permite a los usuarios agregar nuevas tareas, actualizar su estado y eliminarlas cuando estén completas.

## Instalación

1. Clona este repositorio: `git clone https://github.com/guille1999utp/nuawi_back.git`
2. Instala las dependencias: `npm install`

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias.

   MONGODB_CNN=<Tu cadena de conexión de MongoDB>
   PORT=<Puerto en el que desea que funcione el servidor>

## Uso

1. Inicia el servidor: `npm start`
2. Abre Swagger UI en tu navegador: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Esto proporcionará una interfaz interactiva para probar y explorar las API.

## Documentación

La documentación de la API se genera automáticamente utilizando Swagger. Puedes acceder a la documentación en [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

La API incluye los siguientes endpoints:

- `GET /task`: Obtiene todas las tareas.
- `POST /task`: Agrega una nueva tarea.
- Parámetro de solicitud: `{ "title": "Nuevo título" }`
- `PUT /task/:id`: Actualiza una tarea existente.
- Parámetros de solicitud: `{ "title": "Nuevo título", "status": "completada" }`
- `DELETE /task/:id`: Elimina una tarea existente.
