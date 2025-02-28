import express from "express"; // Importa Express
import 'dotenv/config'; // Importa las variables de entorno desde un archivo .env
import cors from 'cors'; // Importa el módulo CORS
import { Database } from './config/database.config.js'; // Importa la configuración de la base de datos
import { UserRoutes } from './routes/user.routes.js'; // Importa las rutas de usuario

const app = express(); // Crea una instancia de la aplicación Express
const port = process.env.APP_PORT || 3001; // Establece el puerto desde el archivo .env o usa el puerto 3001

app.use(express.urlencoded({ extended: true })); // Middleware para manejar datos URL-encoded
app.use(express.json()); // Middleware para manejar datos en formato JSON
app.use(cors(
    {
        origin: '*'
    }
)); // Middleware para habilitar CORS

const database = new Database(); // Crea una instancia de la clase Database
database.connection(); // Establece la conexión con la base de datos

const userRoutes = new UserRoutes();// Crea una instancia de las rutas de usuario

userRoutes.initUserRoutes(app);// Inicializa las rutas de usuario

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); // Inicia el servidor en el puerto especificado
});
