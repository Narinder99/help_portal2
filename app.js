import pkg from 'express';
const express = pkg;
import fsi from 'fs';
const fs=fsi

import pathi from 'path'
const path=pathi;
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3002;
import mongoosei from 'mongoose';
const mongoose=mongoosei
import {mongoUrl} from './string.js'

import ejsi from 'ejs';
const ejs=ejsi;

//app initallize
//app.use('/public', express.static('public'))
console.log(__dirname)
//app.use(express.static(path.join(__dirname, 'css')))

app.use(express.static(__dirname)); //Add this line. Change public to whatever location your static assets are stored at

app.use(express.urlencoded())
app.set('views', path.join(__dirname, 'view'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// database connection
mongoose.connect(mongoUrl);
const con=mongoose.connection;
con.on('open',()=>{
    console.log("connected ")
})

app.use(express.json())

// area router
import AreaRouter from './routes/area.js'
app.use('/area',AreaRouter);

// department router
import DepartmentRouter from './routes/departments.js'
app.use('/department',DepartmentRouter);

//submitData
import SubmitDataRouter from './routes/submitData.js'
app.use('/submit',SubmitDataRouter)

//update Data
import updateDataRouter from './routes/updateData.js'
app.use('/update',updateDataRouter)

app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('index.html',params);
})
app.get('/verification',(req,res)=>{
    //const params={};
    res.status(200).render('verification.html');
})

app.listen(port,()=>{
    console.log(`Application is running on a ${port}`);
})