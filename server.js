const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');


const authRoutes = require('./routes/auth/auth_routes');
const userRoute = require('./routes/user/user_routes');
const productRoutes = require('./routes/products/productRoutes');
const cartRoutes = require('./routes/products/cartRoutes');
const orderRoutes = require('./routes/products/orderRoutes');


dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoute);
app.use('/api', productRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.log('MongoDB connection failed:', err.message);
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

