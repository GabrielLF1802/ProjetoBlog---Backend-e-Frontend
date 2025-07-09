const express= require('express')
const router= express.Router()
const mongoose= require('mongoose')
require('../models/Usuario')
const Usuario= mongoose.model('usuarios')
const bcrypt= require('bcryptjs')

router.get('/registro',(req,res)=>{
    res.render('usuario/registro')
})
router.post('/registro', (req,res)=>{
    erros=[]
    if( !req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: 'Nome inválido'})
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: 'Email inválido'})
    }
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: 'Email inválido'})
    }
    if (req.body.senha.length < 4){
        erros.push({texto: 'Senha muito curta'})
    }
    if (req.body.senha != req.body.senha2){
        erros.push({texto: 'As senhas não são iguais'})
    }
    if (erros.length>0){
        res.render('usuario/registro',{erros:erros})

    }else{
        Usuario.findOne({email:req.body.email}).then((usuario)=>{
            if(usuario){
                req.flash('error_msg','Email já registrado')
                res.redirect('/usuario/registro')
            }else{
                const novoUsuario = new Usuario({
                    nome:req.body.nome,
                    senha:req.body.senha,
                    email:req.body.email
                })
                bcrypt.genSalt(10, (erro, salt)=>{
                    bcrypt.hash(novoUsuario.senha, salt, (erro,hash)=>{
                        if(erro){
                            req.flash('error_msg','Erro no sistema de cadastro')
                            res.redirect('/')
                        }
                        novoUsuario.senha = hash
                        novoUsuario.save().then(()=>{
                            req.flash('sucess_msg','Novo usuário cadastrado com sucesso!')
                            res.redirect('/')
                        }).catch((err)=>{
                            req.flash('error_msg','Falha ao cadastrar novo usuário')
                            res.redirect('/')
                        })
                    })
                })
                
            }
        }).catch((err)=>{
            req.flash('error_msg','Erro no registro')
            res.redirect('/')
        })

    }

})
router.get('/login',(req,res)=>{
    res.render('usuario/login')
})


module.exports= router