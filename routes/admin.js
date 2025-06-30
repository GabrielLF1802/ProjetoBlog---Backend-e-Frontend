const express = require('express')
const router = express.Router()
const mongoose= require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/',(req,res)=>{
    res.render('admin/index')
})
router.get('/categorias',(req,res)=>{
    res.render('admin/categorias')
})
router.get('/categorias/add',(req,res)=>{
    res.render('admin/add')
})
router.post('/categorias/nova', (req, res) => {
  console.log(req.body) // 👈 testa se os dados chegaram

  const novaCategoria = {
    nome: req.body.nome,
    slug: req.body.slug
  }

  new Categoria(novaCategoria).save().then(() => {
    console.log('Categoria salva com sucesso!')
    res.redirect('/admin/categorias')
  }).catch((err) => {
    console.log('Erro ao salvar: ' + err)
    res.send('Erro ao salvar categoria.')
  })
})


module.exports = router