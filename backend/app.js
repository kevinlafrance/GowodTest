const express = require('express');
const mongoose = require('mongoose');


const userRoutes = require('./routes/userRouter');

mongoose.connect('mongodb+srv://Gowod:gowod@cluster0.w8xmb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log('Connexion à la Bdd SO GOOD'))
    .catch(() => console.log('Connection loupée essaie encore !'))


    const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/auth', userRoutes);

module.exports = app;
