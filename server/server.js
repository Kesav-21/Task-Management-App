const express=require('express');
require('dotenv').config();
const connectDB=require('./db/database');
const app=express();
var cors=require('cors');
const authRouter=require('./routes');
app.use(cors());
app.use(express.json());
