import  * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import testroutes from "./routes/testroutes.js";
import authroutes from "./routes/authroutes.js";
import inventoryRoutes from './routes/inventoryRoutes.js';
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from './config/db.js';



connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/test', testroutes);
app.use('/api/v1/auth', authroutes);
app.use('/api/v1/inventory', inventoryRoutes);

const PORT = process.env.PORT || 8089;

// Start the server
app.listen(PORT, () => {
    console.log(`Node server running in ${process.env.DEV_MODE} mode on port ${PORT}`.yellow.bold);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please use a different port.`);
    } else {
      console.error(err);
    }
  });

