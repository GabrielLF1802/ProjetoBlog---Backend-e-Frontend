const express = require('express')
const router = express.Router()
const mongoose= require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/',(req,res)=>{
    res.render('admin/index')
})

router.get('/categorias',(req,res)=>{
  Categoria.find().then((categorias)=>{
    res.render('admin/categorias', {categorias: categorias})
  }).catch((err)=>{
    req.flash('error_msg', 'Houve um erro ao listar as categorias')
    res.render('/admin')
  })
    
})
router.get('/categorias/add',(req,res)=>{
    res.render('admin/add')
})
router.post('/categorias/nova', (req, res) => {

  let erros =[]

  if (!req.body.nome || req.body.nome== null || req.body.nome == undefined){
    erros.push({texto: "nome inválido"})
  }
  if (!req.body.slug || req.body.slug==null || req.body.slug ==undefined){
    erros.push({texto:"slug inválido"})
  }
  if (erros.length>0){
    res.render("admin/add", {erros: erros })
  }else{
    const novaCategoria = {
    nome: req.body.nome,
    slug: req.body.slug
  }

  new Categoria(novaCategoria).save().then(() => {
    req.flash('sucess_msg', "Categoria criada com sucesso")
    console.log('Categoria salva com sucesso!')
    res.redirect('/admin/categorias')
  }).catch((err) => {
    req.flash('error_msg','Houve um erro ao salvar a categoria')
    console.log('Erro ao salvar: ' + err)
    res.redirect('/admin')

  })
  }

})

router.get('/categorias/edit/:id', (req,res)=>{
  Categoria.findOne({_id:req.params.id}).then((categoria)=>{
    res.render("admin/editcategoria",{categoria:categoria})
  }).catch((err)=>{
    req.flash('error_msg', 'Essa categoria não existe')
    res.redirect('/admin/categorias')
  })
  

})

router.post('/categorias/edit',(req,res)=>{
  Categoria.findOne({_id:req.body.id}).then((categoria)=>{
    categoria.nome= req.body.nome
    categoria.slug= req.body.slug

    categoria.save().then(()=>{
      req.flash('sucess_msg','Categoria editada com sucesso!')
      res.redirect('/admin/categorias')
    }).catch((err)=>{
      req.flash('error_msg','Erro ao salvar a categoria')
      res.redirect('/admin/categorias')
    })

  }).catch(()=>{
    req.flash('error_msg','Houve um erro ao editar a categoria')
    res.redirect('/admin/categorias')
  })
})

router.post('/categorias/delet',(req,res)=>{   
   Categoria.deleteOne({id:req.body.id}).then(()=>{
    req.flash('sucess_msg','Categoria deletada com sucesso!')
    res.redirect('/admin/categorias')
  }).catch((err)=>{
    req.flash('error_msg','Não foi possível deletar a categoria')
    res.redirect('/admin/categorias')
  })
})

router.get('/postagens', (req,res)=>{
  res.render('admin/postagens')
})
router.get('/postagens/add',(req,res)=>{
  Categoria.find().then((categorias)=>{
    res.render('admin/addpostagem',{categorias:categorias})
  }).catch((err)=>{
    req.flash('error_msg','Erro ao carregar o formulário')
  })
})

module.exports = router


// Fazer verificação do delet e do edit 
