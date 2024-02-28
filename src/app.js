import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import roomRoutes from "./routes/room.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true

}));


app.use('/api', authRoutes);
app.use('/api', roomRoutes);
app.use('/api', taskRoutes);

export default app;