import express from 'express';
import cors from 'cors';
import { apiV1Router } from './routes';
import dotenv from 'dotenv';
import { connectDatabase } from './config/mongodb';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Database
connectDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req: any, res: any) => {
    res.send('Monitoramento de Métricas da Infancia API');
});

app.use('/api/v1', apiV1Router);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
