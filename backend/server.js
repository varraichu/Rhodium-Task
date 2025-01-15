const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/users');
const carRoutes = require('./routes/cars');
const generateURL = require('./s3.js');



const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from this origin
    methods: ['GET', 'POST'], // You can adjust the allowed methods as needed
    allowedHeaders: ['Content-Type'], // You can add more allowed headers here if needed
}));

mongoose.connect(
    process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.log('MongoDB connection failed', err);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.use('/user', userRoutes);
app.use('/cars', carRoutes);

app.get('/s3Url', async (req, res) => {
    try {
      const url = await generateURL();
      res.json({ url }); 
    } catch (err) {
      console.error('Error generating S3 URL:', err.message);
      res.status(500).json({ message: 'Error generating S3 URL' });
    }
  });