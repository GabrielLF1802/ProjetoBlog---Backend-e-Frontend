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


module.exports = router