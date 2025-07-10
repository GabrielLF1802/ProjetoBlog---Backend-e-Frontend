const express = require('express')
const router = express.Router()
const mongoose= require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Postagem')
const Postagem= mongoose.model('postagens')
const {eAdmin}=require('../helpers/eAdmin')

router.get('/',eAdmin,(req,res)=>{
    res.render('admin/index')
})

router.get('/categorias',eAdmin,(req,res)=>{
  Categoria.find().then((categorias)=>{
    res.render('admin/categorias', {categorias: categorias})
  }).catch((err)=>{
    req.flash('error_msg', 'Houve um erro ao listar as categorias')
    res.render('/admin')
  })
    
})
router.get('/categorias/add',eAdmin,(req,res)=>{
    res.render('admin/add')
})
router.post('/categorias/nova', eAdmin,(req, res) => {

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

router.get('/categorias/edit/:id', eAdmin,(req,res)=>{
  Categoria.findOne({_id:req.params.id}).then((categoria)=>{
    res.render("admin/editcategoria",{categoria:categoria})
  }).catch((err)=>{
    req.flash('error_msg', 'Essa categoria não existe')
    res.redirect('/admin/categorias')
  })
  

})

router.post('/categorias/edit',eAdmin,(req,res)=>{
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

router.post('/categorias/delet',eAdmin,(req,res)=>{   
   Categoria.deleteOne({id:req.body.id}).then(()=>{
    req.flash('sucess_msg','Categoria deletada com sucesso!')
    res.redirect('/admin/categorias')
  }).catch((err)=>{
    req.flash('error_msg','Não foi possível deletar a categoria')
    res.redirect('/admin/categorias')
  })
})

// Rotas para postagens

router.get('/postagens',eAdmin, (req,res)=>{
  Postagem.find().populate('categoria').sort({data:'desc'}).then((postagens)=>{
    res.render('admin/postagens',{postagens:postagens})
  }).catch((err)=>{
    req.flash('error_msg', 'Erro ao carregar as postagens')
    res.render('admin/postagens')
  })
})
router.get('/postagens/add',eAdmin,(req,res)=>{
  Categoria.find().then((categorias)=>{
    res.render('admin/addpostagem',{categorias:categorias})
  }).catch((err)=>{
    req.flash('error_msg','Erro ao carregar o formulário')
  })
})
router.post('/postagens/nova',eAdmin,(req,res)=>{
  erros= []
  if(req.body.categoria== "0"){
    erros.push({texto:'Sem categoria registrada, por favor registre uma categoria'})
    
  }
  if(erros.length>0){
    res.render('/admin/addpostagem',{erros:erros})
  }
  else{
    const novaPostagem = {
      categoria:req.body.categoria,
      conteudo: req.body.conteudo,
      slug: req.body.slug,
      descricao: req.body.descricao,
      titulo: req.body.titulo
    }
    new Postagem(novaPostagem).save().then(()=>{
      req.flash('sucess_msg','Nova postagem registrada com sucesso')
      res.redirect('/admin/postagens')
    }).catch(()=>{
      req.flash('error_msg','Houve um erro ao cadastrar a nova postagem')
      res.redirect('/admin/postagens')
    })

  }
})
router.get('/postagens/edit/:id',eAdmin,(req,res)=>{
  Postagem.findOne({_id:req.params.id}).then((postagens)=>{
        Categoria.find().then((categorias)=>{
          res.render('admin/editpostagem',{categorias:categorias, postagens:postagens})

      }).catch((err)=>{
      req.flash('error_msg','Erro ao carregar a categoria')
      res.redirect('/admin/postagens')
    })
  })
})
router.post('/postagens/edit',eAdmin,(req,res)=>{
  Postagem.findOne({id:req.body.id}).then((postagens)=>{
    postagens.titulo= req.body.titulo,
    postagens.slug= req.body.slug,
    postagens.conteudo= req.body.conteudo,
    postagens.descricao= req.body.descricao,
    postagens.categoria= req.body.categoria

    postagens.save().then(()=>{
      req.flash('sucess_msg','Postagem editada com sucesso!')
      res.redirect('/admin/postagens')
    }).catch((err)=>{
      req.flash('error_msg','Falha ao salvar a postagem, verifique os campos')
      res.redirect('/admin/postagens')
    })
  }).catch((err)=>{
    req.flash('error_msg','Erro ao editar a postagem')
    res.redirect('/admin/postagens')
  })
})
router.post('/postagens/delet',eAdmin,(req,res)=>{
  Postagem.deleteOne({_id:req.body.id}).then(()=>{
    req.flash('sucess_msg','Postagem deletada com sucesso!')
    res.redirect('/admin/postagens')
  }).catch((err)=>{
    req.flash('error_msg','Erro ao deletar a postagem')
    res.redirect('/admin/postagens')
  })
})



module.exports = router


// Fazer verificação do delet e do edit 
