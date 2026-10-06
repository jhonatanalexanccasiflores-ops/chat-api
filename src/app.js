const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/chats', chatRoutes);
app.use('/messages', messageRoutes);
app.get('/', (req, res) => {

    res.json({
        success: true,
        data: null,
        message: 'API de Chat funcionando correctamente'
    });

});

app.use(errorMiddleware);


module.exports = app;