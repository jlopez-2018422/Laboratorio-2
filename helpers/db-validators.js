// const Role = require('../models/role');
const Empresa = require('../models/empresa');
const Sucursal = require('../models/sucursal');

const Tipo = require('../models/tipo');
const Municipio = require('../models/municipio');



const esTipoValido = async (tipo = '') => {

    const existeTipo = await Tipo.findOne({ tipo });

    if (!existeTipo) {   
        throw new Error(`El tipo ${tipo} no está registrado en la DB`);
    }
}

const esMunicipioValido = async (municipio = '') => {

    const existeMunicipio = await Municipio.findOne({ municipio });

    if (!existeMunicipio) {   
        throw new Error(`El municipio " ${ municipio } " no está registrado en la DB`);
    }
}


const emailExiste = async (correo = '') => {

    const existeEmail = await Empresa.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El correo: " ${correo} " ya existe y esta registrado en la DB`);
    }
}


const nombreExiste = async (nombre  = '') => {

    const nombreExiste = await Empresa.findOne({ nombre });
    // const nombresucuExiste = await Sucursal.findOne({ nombre });

    if (nombreExiste ) {
        throw new Error(`El nombre : ${nombre} ya existe y esta registrado en la DB`);
    }
}


const existeEmpresaPorId = async (id) => {

    const existeEmpresa = await Empresa.findById(id);

    if (!existeEmpresa) {
        throw new Error(`El id ${id} no existe en la DB`);
    }
}

const existeCursoPorId = async (id) => {

    const existeUser = await Curso.findById(id);

    if (!existeUser) {
        throw new Error(`El id ${id} no existe en la DB`);
    }
}



module.exports = {
    esTipoValido,
    esMunicipioValido,
    emailExiste,
    nombreExiste,
    existeEmpresaPorId,
}