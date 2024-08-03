const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { authenticateJWT } = require('./controllers/authController');
const { authorizeRole } = require('./controllers/authController');
const socketServer = require('./socketServer');

const app = express();

mongoose.connect('mongodb://localhost:27017/taskmanagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticateJWT, taskRoutes);

const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

socketServer(server);
