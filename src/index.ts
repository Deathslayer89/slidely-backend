import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import submissionRoutes from './routes/submissionRoutes'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 3000;
const mongoUri = process.env.MONGOURI || 'undefined';

mongoose.connect(mongoUri).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});
app.use(cors());
app.use(bodyParser.json());
app.use('/api', submissionRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
