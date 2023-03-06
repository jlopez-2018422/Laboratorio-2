const {Schema, model} = require('mongoose');

const EmpresaSchema = new Schema({
    nombre: {
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio' ]
    },
    tipo:{
        type : String,
        required: [true, 'El tipo es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    sucursales:{
        type: Array,
        default: []
    }
})
module.exports = model('Empresa', EmpresaSchema);