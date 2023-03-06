const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const Sucursal = require('../models/sucursal');

const coleccionesPermitidas = [
    'sucursales'
];


const buscarSucursales = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino );  //TRUE

    if ( esMongoID ) {
        const sucursal = await Sucursal.findById(termino);
        return res.json({
            //results: [ sucursal ]
            results: ( sucursal ) ? [ sucursal ] : [] 
            //Preugntar si el sucursal existe, si no existe regresa un array vacio
        });
    } 

    //Expresiones regulares, buscar sin impotar mayusculas y minusculas (DIFIERE DE EL)
    const regex = new RegExp( termino, 'i');

    const sucursales = await Sucursal.find({
        $or: [ { nombre: regex }, { correo: regex } ],
        $and: [ { estado: true } ]
    });

    res.json({
        results: sucursales
    })

}


const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `La colección: ${ coleccion } no existe en la DB
                  Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }
    switch (coleccion) {
        case 'sucursales':
            buscarSucursales(termino, res);
        break;
        default:
            res.status(500).json({
                msg: 'Ups, se me olviod hacer esta busqueda...'
            });
        break;
    }

}


module.exports = {
    buscar
}