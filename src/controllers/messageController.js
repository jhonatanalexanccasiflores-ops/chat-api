const Message = require('../models/Message');
const User = require('../models/User');
const Chat = require('../models/Chat');
const createMessage = async (req, res, next) => {
    try {

        const { texto, chatId, userId } = req.body;

        // Verificar usuario
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Usuario no encontrado'
            });
        }

        // Verificar chat
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Chat no encontrado'
            });
        }

        // Crear mensaje
        const message = await Message.create({
            texto,
            chatId,
            userId
        });

        res.status(201).json({
            success: true,
            data: message,
            message: 'Mensaje enviado correctamente'
        });

    } catch (error) {
        next(error);
    }
};

const getMessagesByChat = async (req, res, next) => {
    try {

        const { chatId } = req.params;

        // Verificar que exista el chat
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Chat no encontrado'
            });
        }

        // Obtener mensajes del chat
        const messages = await Message.find({ chatId })
            .populate('userId', 'nombre email')
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            data: messages,
            message: 'Historial obtenido correctamente'
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createMessage,
    getMessagesByChat
};