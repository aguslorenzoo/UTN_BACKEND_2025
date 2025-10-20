import ENVIROMENT from "./config/enviroment.config.js";
import connectToMongoBD from "./config/configMongoDB.config.js";
import express from 'express';
import workspaceRouter from "./routers/workspace.router.js";
import authRouter from "./routers/auth.router.js";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// ✅ CONEXIÓN NO BLOQUEANTE
let isDatabaseConnected = false;

// Conectar a DB pero no esperar
connectToMongoBD().then(() => {
    console.log('✅ Conectado a MongoDB');
    isDatabaseConnected = true;
}).catch(error => {
    console.log('❌ Error conectando a MongoDB:', error.message);
    isDatabaseConnected = false;
});

// Ruta de health check que no depende de DB
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        database: isDatabaseConnected ? 'Connected' : 'Connecting',
        timestamp: new Date() 
    });
});

app.get('/test', (request, response) => {
    response.send('<h1>Hola Mundo</h1>');
});

// Tus rutas normales (pueden fallar si DB no está conectada)
app.use('/api/auth', authRouter);
app.use('/api/workspace', workspaceRouter);

// Middleware para manejar DB no conectada
app.use((req, res, next) => {
    if (!isDatabaseConnected && req.method !== 'GET') {
        return res.status(503).json({ 
            error: 'Database connecting, please try again later' 
        });
    }
    next();
});

export default app;

