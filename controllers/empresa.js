const {response, request} = require('express');
const Empresa = require('../models/empresa');
const bcryptjs = require('bcryptjs');

const getEmpresas = async (req = request, res = response) => {
    const query = { estado: true };

    const listaEmpresas = await Promise.all([
        
        Empresa.countDocuments(query),
        Empresa.find(query)
    ])

    res.json({
        msg: 'get Api - Empresas',
        listaEmpresas
    });
}


const postEmpresa = async (req = request, res = response) => {
    try {
        const { nombre, correo, password, tipo } = req.body;
        const empresaDB = new Empresa({ nombre, correo,password, tipo });
    
        const salt = bcryptjs.genSaltSync();
        empresaDB.password = bcryptjs.hashSync(password, salt);
    
        await empresaDB.save();
    
        res.json({
          msg: 'Post - Empresa Agregada',
          empresaDB
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({
          msg: 'Error al guardar la empresa en la base de datos'
        });
      }
}

const putEmpresa = async(req = request, res = response) => {
   
    try {
        const empresaId = req.empresa._id;
        const { nombre, correo, tipo } = req.body;
    
        const empresa = await Empresa.findByIdAndUpdate(empresaId, { nombre, correo, tipo  }, { new: true });

        res.json({
          msg: 'Empresa actualizada correctamente',
          empresa
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({
          msg: 'Error al actualizar la empresa en la base de datos'
        });
      }
    
}

const putMyUser = async (req = request, res = response) => {
    // const {id} = req.params;
    // const user = req.user._id;
    // const idUser = user.toString();

    // if (id === idUser) {
    //     const {_id, role,...resto} = req.body;
    //     const salt = bcryptjs.genSaltSync();
    //     resto.password = bcryptjs.hashSync(resto.password, salt);
    //     const userEditado = await User.findByIdAndUpdate(id, resto, {new: true});
    //     res.status(200).json({
    //         msg: 'put api usuarios',
    //         userEditado
    //     })
    // } else{
    //     res.status(401).json({
    //         msg: 'si no es tu cuenta, no puedes editarla'

    //     })
    // }

}

const deleteEmpresa= async(req = request, res = response) => {
    try {
      const empresaId = req.empresa._id;
      
  
      const empresaEliminada = await Empresa.findByIdAndUpdate(empresaId, { estado: false }, {new : true});
  
      res.json({
        msg: 'Empresa eliminada correctamente',
        empresaEliminada
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al eliminar la empresa en la base de datos'
      });
    }
}

const deleteMyUser = async(req = request, res = response) => {
    // const {id} = req.params;
    // const user = req.user._id;
    // const idUser = user.toString();

    // if(id === idUser){
    //     const userEliminado = await User.findByIdAndDelete(id);
    //     res.status(200).json({
    //         msg: 'delete api usuarios',
    //         userEliminado
    //     })
    // }else{
    //     res.status(401).json({
    //         msg: 'si no es tu cuenta, no puedes eliminarla'


    //     })
    // }
    
}

const registrarEmpresa = async (req = request, res = response) => {
    try {
        const { nombre, correo, password, tipo } = req.body;
        const empresaDB = new Empresa({ nombre, correo,password, tipo });
    
        const salt = bcryptjs.genSaltSync();
        empresaDB.password = bcryptjs.hashSync(password, salt);
    
        await empresaDB.save();
    
        res.json({
          msg: 'Post - Empresa Agregada',
          empresaDB
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({
          msg: 'Error al registrarse la empresa en la base de datos'
        });
      }
}

const getMisSucursales = async (req = request, res = response) => {
    // const user = req.user._id;
    // const cursos = req.user.cursos

    // res.json({
    //     msg: 'get api cursos del alumno',
    //     cursos
    // })

    const empresa = req.empresa._id;
    const sucursales = req.empresa.sucursales;

    res.json({
        msg: 'get api Mis Sucursarles',
        sucursales
    })
    
}


module.exports = {
    registrarEmpresa,
    getEmpresas,
    postEmpresa,
    putEmpresa,
    deleteEmpresa,
    getMisSucursales
}