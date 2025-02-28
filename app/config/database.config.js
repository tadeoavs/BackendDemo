import { Sequelize } from "sequelize";

export const DatabaseConfig = new Sequelize({
    host: "localhost", // El host de la base de datos (generalmente 'localhost' si está en la misma máquina)
    database: "mysql", // Nombre de la base de datos
    username: "root", // Usuario de la base de datos
    password: "", // Contraseña (si tienes una)
    dialect: "mysql", // El tipo de base de datos que estás usando (MySQL en este caso)
    timezone: "-05:00", // Zona horaria
    port: 3306, // Puerto (MySQL usa por defecto el puerto 3306)
    logging: false, // Deshabilita los logs de las consultas SQL
    pool: { // Configuración del pool de conexiones
        max: 5, // Número máximo de conexiones
        min: 5, // Número mínimo de conexiones
        acquire: 60000, // Tiempo máximo de espera para obtener una conexión
        idle: 15000, // Tiempo máximo de inactividad para liberar una conexión
    },
});

export class Database {
    // Método asíncrono para establecer la conexión
    async connection() {
        try {
            // Intenta autenticar la conexión con la base de datos
            await DatabaseConfig.authenticate();
            console.log("Connection has been established successfully"); // Mensaje de éxito
            return { ok: true, message: "Connection to the database established correctly" }; // Devuelve un mensaje de éxito
        } catch (error) {
            console.error("Unable to connect to the database: ", error); // Mensaje de error
            return { ok: false, message: `Could not connect to database. Please check the following: ${error} ` }; // Devuelve un mensaje de error
        }
    }
}
