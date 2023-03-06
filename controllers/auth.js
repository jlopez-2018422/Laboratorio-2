const {request, response} = require('express');

const Empresa = require('../models/empresa');

const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');


const login = async( req = request, res = response ) => {

    const {correo, password} = req.body;

    try {

        // Verificar si el correo existe o es valido.

        const empresa = await Empresa.findOne( { correo} );
        if ( !empresa ) {
            return res.status(400).json({
                msg: 'El correo es incorrecto'
            });
        }
        //Verificar si el empresa existe o es valido.

        if (!empresa){
            return res.status(202).json({
                msg: 'Empresa inexistente'
            })
        }
            
        // Validar la password del usuario

        if (!bcryptjs.compareSync( password, empresa.password )) {
            return res.status(400).json({
                msg: 'La password es incorrecta'


            })
        }

        const token = await generarJWT(empresa.id);
    
        res.json({
           
            msg: `Hola ${empresa.nombre}`,
            correo,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }

}

module.exports= {
    login
}