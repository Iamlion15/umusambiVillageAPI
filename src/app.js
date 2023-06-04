import express from 'express';
import dbConnect from './database/db';
import cors from 'cors';
import adminRoutes from './routes/admin/adminRoutes';
import visitorRoutes from './routes/visitor/visitorRoutes';
const app=express();
dbConnect();
app.use(cors({origin:"*"}))
app.use(express.json());
app.use("/api/admin",adminRoutes);
app.use("/api/visitor",visitorRoutes);

export default app;