const User = require('../models/User');

// ==========================================
// CREAR USUARIO
// POST /users
// ==========================================
const createUser = async (req, res, next) => {
    try {
        const { nombre, email } = req.body;

        const user = await User.create({
            nombre,
            email
        });

        res.status(201).json({
            success: true,
            data: user,
            message: 'Usuario creado correctamente'
        });

    } catch (error) {
        next(error);
    }
};


// ==========================================
// LISTAR USUARIOS
// GET /users
// ==========================================
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            data: users,
            message: 'Usuarios obtenidos correctamente'
        });

    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: user,
            message: 'Usuario eliminado correctamente'
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createUser,
    getUsers,
    deleteUser
};