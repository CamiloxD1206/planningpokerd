import User from "../models/user.model.js";
import createAccessToken from "../libs/jwt.js";
export const register = async(req, res) => {
    const { username, mode } = req.body;
    try {
        const newUser = new User({
            username,
            mode,
        });
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id })
        res.cookie('token', token)
        res.json({
            username: userSaved.username,
            mode: userSaved.mode
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
};

export const login = async(req, res) => {
    const { username } = req.body;
    try {

        const userFound = await User.findOne({ username });

        if (!userFound) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }


        const token = await createAccessToken({ id: userFound._id });

        res.cookie('token', token)
        res.json({ username: userFound.username });




    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}