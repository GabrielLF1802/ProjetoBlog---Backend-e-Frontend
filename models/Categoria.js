const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Categoria = new Schema ({
    nome:{
        type:String,
        required:true
    },
    slug:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        required: true,
        default: Date.now()
    }
    
})
mongoose.model('categorias', Categoria)