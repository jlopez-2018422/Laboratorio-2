const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Empresa = require('../models/empresa');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    
    if ( !token ) {
        return res.status(401).json({
            msg: 'Es necesario un token en el header de la peticion'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );

        const empresa = await Empresa.findById( uid );
        if ( !Empresa ) {
            return res.status(401).json({
                msg: 'el token no es valido o el usuario no existe'

            });
        }

        req.empresa = empresa;
        
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'El token no es valido'

        })
    }

}


module.exports = {
    validarJWT
}