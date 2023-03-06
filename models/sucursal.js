const {Schema, model} = require('mongoose');

const SucursalSchema = new Schema({
    
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio']

    },
    direccion:{
        type:String,
        required:[true, 'La direccion es obligatoria']
    },
    municipio:{
        type: String,
        required:[true, 'El municipio es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    },
    empresa:{
        type: Schema.Types.ObjectId,
        ref:'Empresa'
    },
    
});
module.exports = model('Sucursale',SucursalSchema);