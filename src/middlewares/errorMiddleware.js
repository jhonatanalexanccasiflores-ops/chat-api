const errorMiddleware = (err, req, res, next) => {

    console.error('ERROR:', err);

    // Error de ObjectId inválido de MongoDB
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'El ID proporcionado no es válido'
        });
    }

    // Error de validación de Mongoose
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'Los datos enviados no son válidos',
            errors: err.errors
        });
    }

    // Error de clave duplicada
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            data: null,
            message: 'El dato enviado ya existe'
        });
    }

    // Error general
    res.status(500).json({
        success: false,
        data: null,
        message: 'Error interno del servidor'
    });
};

module.exports = errorMiddleware;