//Carregando módulos

const express = require ('express')
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path= require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash= require('connect-flash')

// const mongoose = require('mongoose')

//Configurações - Módulos

    // Session
    app.use(session({
        secret:"appnode",
        resave:true,
        saveUninitialized:true
    }))
    app.use(flash())
    // Middleware
    app.use((req,res,next)=>{
        res.locals.sucess_msg= req.flash('sucess_msg')
        res.locals.error_msg= req.flash('error_msg')
        next()
    })

    // Body-parser
        app.use(bodyParser.urlencoded({extended:false}))
        app.use(bodyParser.json())
    // Handlebars
        app.engine('handlebars', engine({defaultLayout:'main'}))
        app.set('view engine', 'handlebars')


    //Public
        app.use(express.static(path.join(__dirname,'public')))

    // Middleware
        app.use((req,res,next)=>{
            console.log('Oi eu sou o middleware')
            next()
        })


    // Mongoose
        mongoose.Promise= global.Promise
        mongoose.connect('mongodb://localhost/blogapp').then(() => {
            console.log('Conectado ao mongo')
        }).catch((erro)=>{
            console.log('Falha ao conectar' + erro)
        })


// Rotas: 

app.use('/admin',admin)


// Inicialização do Servidor
const PORT = 8081
app.listen(PORT, ()=>{
    console.log('Server Started!')
})
