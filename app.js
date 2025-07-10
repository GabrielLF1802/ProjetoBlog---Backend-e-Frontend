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
require('./models/Postagem')
const Postagem= mongoose.model('postagens')
require('./models/Categoria')
const Categoria= mongoose.model('categorias')
const usuario= require('./routes/usuario')
const passport= require('passport')
require('./config/auth')(passport)


// const mongoose = require('mongoose')

//Configurações - Módulos

    // Session
    app.use(session({
        secret:"appnode",
        resave:true,
        saveUninitialized:true
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    
    // Middleware
    app.use((req,res,next)=>{
        res.locals.sucess_msg= req.flash('sucess_msg')
        res.locals.error_msg= req.flash('error_msg')
        res.locals.error= req.flash('error')
        res.locals.user= req.user || null
        next()
    })

    // Body-parser
        app.use(bodyParser.urlencoded({extended:false}))
        app.use(bodyParser.json())
    // Handlebars
        app.engine('handlebars', engine({defaultLayout:'main',runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }}))
        app.set('view engine', 'handlebars')


    //Public
        app.use(express.static(path.join(__dirname,'public')))




    // Mongoose
        mongoose.Promise= global.Promise
        mongoose.connect('mongodb://localhost/blogapp').then(() => {
            console.log('Conectado ao mongo')
        }).catch((erro)=>{
            console.log('Falha ao conectar' + erro)
        })


// Rotas: 

app.use('/admin',admin)
app.use('/usuario', usuario)

// Page Home
app.get('/',(req,res)=>{
    Postagem.find().populate('categoria').then((postagens)=>{
        res.render('index',{postagens:postagens})
    }).catch((err)=>{
        req.flash('error_msg','Erro ao carregar postagens')
        res.redirect('/404')
    })
})
app.get('/404',(req,res)=>{
    res.send('Erro 404')
})
app.get('/postagens/:slug',(req,res)=>{
    Postagem.findOne({slug:req.params.slug}).then((postagens)=>{
        if(postagens){
            res.render('postagem/index',{postagens:postagens})
        }else{
            req.flash('error_msg','Postagem não encontrada')
        }
    }).catch((err)=>{
        req.flash('error_msg','Erro interno')
        res.redirect('/categoria/categorias')
    })
})
app.get('/categorias',(req,res)=>{
    Categoria.find().then((categorias)=>{
        res.render('categoria/categorias',{categorias:categorias})
    }).catch((err)=>{
        req.flash('error_msg','Erro ao listar as categorias')
        res.redirect('/')
    })
})
app.get('/categorias/:slug',(req,res)=>{
    Categoria.findOne({slug:req.params.slug}).then((categoria)=>{
        Postagem.find({categoria: categoria._id}).then((postagens)=>{
            res.render('categoria/postagens',{categoria:categoria, postagens:postagens})
        }).catch((err)=>{
            req.flash('error_msg','Postagens não encontradas')
            res.redirect('/categorias')
        })
    }).catch((err)=>{
        req.flash('error_msg','Categoria da postagem não encontrada')
        res.redirect('/categorias')
    })
})


// Inicialização do Servidor
const PORT = 8081
app.listen(PORT, ()=>{
    console.log('Server Started!')
})
