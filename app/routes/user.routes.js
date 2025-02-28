import express from "express"; // Importa Express
import { UserModel } from "../model/user.model.js"; // Importa el modelo de usuario

export class UserRoutes {
    initUserRoutes(app = express.application) {

        app.get('/hello', (req, res) => {
            res.send('Hello World!')
        });

        app.get('/goodbye', (req, res) => {
            res.send('Goodbye World!')
        });

        app.get('/bye', (req, res) => {
            res.status(404).send('Not found')
        });

        app.get('/hi', (req, res) => {
            res.send('<p>Hola</p><img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google">')
        });

        app.post('/user-data', (req, res) => {
            const { user, password } = req.body;
            console.log('Json object', req.body);
            console.log(user, password);
            res.status(200).send(`Hello ${user}, you are welcome!`);
        })

        // Obtener usuario
        app.post('/get-user', async (req, res) => {
            try {
                const { condition } = req.body;
                const user = await UserModel.findAll({
                    where: condition
                });
                res.status(200).send({ ok: true, data: user });

            } catch (error) {
                console.error('Error', error);
                res.status(500).send({ ok: false, message: 'Internal server error' });
            }
        })

        // Crear un usuario
        app.post('/create-user', async (req, res) => {
            try {
                const { user } = req.body;
                const newUser = await UserModel.create(user);
                res.status(200).send({ ok: true, data: newUser });

            } catch (error) {
                console.error('Error', error);
                res.status(500).send({ ok: false, message: 'Internal server error' });
            }
        })

        // Ruta POST para actualizar un usuario
        app.post("/update-user", async (req, res) => {
            const { condition, user } = req.body;

            try {

                const existingUser = await UserModel.findOne({
                    where: condition,
                });

                if (!existingUser) {
                    return res.status(404).send({ ok: false, message: "Usuario no encontrado" });
                }

                await UserModel.update(user, {
                    where: condition,
                });

                const updatedUser = await UserModel.findOne({
                    where: condition,
                });

                res.status(200).send({
                    ok: true,
                    data: [
                        {
                            id: updatedUser.id,
                            name: updatedUser.name,
                            email: updatedUser.email,
                            password: updatedUser.password,
                            created_at: updatedUser.created_at,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error al actualizar usuario:", error);
                res.status(500).send({ ok: false, message: "Error al actualizar usuario" });
            }
        });



    }
}