const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('admin/index')
})
router.get('/categorias',(req,res)=>{
    res.render('admin/categorias')
})
router.get('/novacategoria',(req,res)=>{
    res.render('admin/novacategoria')
})
router.get('/nova',(req,res)=>{
    res.render('admin/nova')
})

module.exports = router