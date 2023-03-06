const {request, response} = require('express');


const tieneTipo = ( ...tipos ) => {

    return (req = request, res= response, next) => {

        // if (!req.empresa) {
        //     return res.status(500).json({
        //         msg: 'Se quiere verificar el ro sin validar el token primero'
        //     })
        // }

        if (!tipos.includes( req.empresa.tipo)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ tipos }`
            })

        }

        next();

    }

}

    module.exports = {
        tieneTipo
}