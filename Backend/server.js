const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const userRoutes = require('./routes/userRoutes');
const menuItemRoutes=require('./routes/menuItemsRoutes');
const orderRoutes = require('./routes/orderRoutes');
const messageRoutes = require('./routes/messagesRoutes');
const cors= require('cors');

dotenv.config();

const app =express();

app.use(express.json());

const corsOptions={
  origin:'http://localhost:3000',
  methods:['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders:['Content-type','Authorization']
};
app.use(cors(corsOptions));

//Mongodb connection
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err.message));

//define routes
app.use('/users',userRoutes);
app.use('/items',menuItemRoutes);
app.use('/orders',orderRoutes);
app.use('/messages',messageRoutes);


//Start server
const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});