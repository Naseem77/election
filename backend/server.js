import express from "express"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import cookieParser from "cookie-parser"
import path from 'path'

dotenv.config()
connectDB();
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('server is running....');
    });
  }

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>  console.log(`Server is running on port ${PORT}`))