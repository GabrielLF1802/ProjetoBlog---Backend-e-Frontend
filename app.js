//Carregando módulos

const express = require ('express')
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path= require('path')

// const mongoose = require('mongoose')

//Configurações - Módulos

    // Body-parser
        app.use(bodyParser.urlencoded({extended:false}))
        app.use(bodyParser.json())
    // Handlebars
        app.engine('handlebars', engine({defaultLayout:'main'}))
        app.set('view engine', 'handlebars')
    
    // Mongoose


    //Public
        app.use(express.static(path.join(__dirname,'public')))


// Rotas: 

app.use('/admin',admin)


// Inicialização do Servidor
const PORT = 8081
app.listen(PORT, ()=>{
    console.log('Server Started!')
})
