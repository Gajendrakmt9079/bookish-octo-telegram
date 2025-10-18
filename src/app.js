import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/User.routes.js';

const app = express(); // Create an instance of express

app.use(cors());
app.use(json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use('/api/users', router); // Assuming you want to use the router under `/api`

export { app };
