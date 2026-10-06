const Chat = require('../models/Chat');
const User = require('../models/User');

const createChat = async (req, res, next) => {
    try {

        console.log('====================================');
        console.log('CREANDO CHAT');
        console.log('Body recibido:', req.body);

        const { nombre, userId } = req.body;

        console.log('Nombre recibido:', nombre);
        console.log('UserId recibido:', userId);

        // Verificar que exista el usuario
        const user = await User.findById(userId);

        console.log('Usuario encontrado:', user);

        if (!user) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Usuario no encontrado'
            });
        }

        // Crear el chat
        const chat = await Chat.create({
            nombre: nombre,
            userId: userId
        });

        console.log('Chat creado:', chat);
        console.log('====================================');

        res.status(201).json({
            success: true,
            data: chat,
            message: 'Chat creado correctamente'
        });

    } catch (error) {
        console.error('Error al crear chat:', error);
        next(error);
    }
};

const getChats = async (req, res, next) => {
    try {

        const chats = await Chat.find()
            .populate('userId', 'nombre email');

        res.status(200).json({
            success: true,
            data: chats,
            message: 'Chats obtenidos correctamente'
        });

    } catch (error) {
        console.error('Error al obtener chats:', error);
        next(error);
    }
};

module.exports = {
    createChat,
    getChats
};