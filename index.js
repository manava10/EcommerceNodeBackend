require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require('./config/connectMongo');
const healthRoutes = require('./routes/health.route');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.route');
const productRoutes = require('./routes/product.routes');
app.use(express.json());

const startServer = async () =>{
    await connectDB();
    app.use('/api',healthRoutes);
    app.use('/api/auth',authRoutes);
    app.use('/api',productRoutes);
    app.use('/api',adminRoutes);
    app.listen(process.env.PORT ,() =>{
        console.log("Server started on the given port"+process.env.PORT);
    })
}
startServer();
