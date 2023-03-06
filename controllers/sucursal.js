const { response, request, query } = require('express');

const Sucursal = require('../models/sucursal');
const Empresa = require('../models/empresa');

const getSucursales = async( req = request, res = response ) =>{
    const listaSucursales = await Promise.all([
      Sucursal.countDocuments(),
      Sucursal.find().populate('empresa')
    ]);

    res.json({
      msg: 'get Api - Sucursales',
     listaSucursales
  });
}

const postSucursal = async( req= request, res = response ) =>{

  try {
      const {nombre, direccion, municipio} = req.body;
      const empresaId = req.empresa._id;

      const sucursalDB = new Sucursal({nombre, direccion, municipio, empresa: empresaId});

      await sucursalDB.save();

      const empresa = await Empresa.findById(empresaId);
      
      empresa.sucursales.push(sucursalDB._id);
      await empresa.save();
      
      res.json({
        msg: 'Post - Sucursal Agregada',
        sucursalDB
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al guardar la empresa en la base de datos'
      });
    }


}

const putSucursal = async( req = request, res = response ) =>{

    try {
      const { id } = req.params;
      const { nombre, direccion, municipio } = req.body;
  
      const sucursalEditada = await Sucursal.findByIdAndUpdate(id, {nombre, direccion, municipio }, { new: true });

  
      res.json({
        msg: 'Sucursal actualizada correctamente',
        sucursalEditada
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al actualizar la sucursal en la base de datos'
      });
    }
}

const deleteSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const sucursal = await Sucursal.findById(id);

    if (!sucursal) {
      return res.status(404).json({ msg: 'La sucursal no existe' });
    }

    const empresaId = sucursal.empresa;
    const empresa = await Empresa.findById(empresaId);

    if (!empresa) {
      return res.status(404).json({ msg: 'La empresa no existe' });
    }

    empresa.sucursales = empresa.sucursales.filter(sucursalId => sucursalId.toString() !== sucursal._id.toString());

    await empresa.save();
    await Sucursal.findByIdAndDelete(id);

    res.json({ msg: 'Sucursal eliminada correctamente' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al eliminar la sucursal en la base de datos',
    });
  }
};


const asignarAlumno = async(req = request, res = response) =>{
    // const {idCurso} = req.params;
    // const user = req.user._id;
    // const cursos = req.user.cursos;
    // const existeCurso = await Curso.findOne({_id: idCurso});
    // if(!existeCurso){
    //     return res.status(404).json({
    //         msg: 'El curso no ha sido encontrado'
    //     })
    // }
    // if(cursos.length >= 3){
    //     return res.status(400).json({
    //         msg: 'Maximo de 4 cursos alcanzado'

    //     })
    // }
    // for(let curso of cursos){
    //     if(existeCurso._id != curso) continue
    //     var exists = curso
    // }
    // if(exists) return res.status(400).json({ msg: 'Solo puedes asignarte una vez por curso'})
    
    // const updatedUser = await User.findOneAndUpdate(
    //     {_id: user},
    //     {$push: {'cursos': idCurso}},
    //     {new: true}
    // );
    
    // const updatedCurse = await Curso.findOneAndUpdate(
    //     {_id: idCurso},
    //     {$push: {'alumnos': user}},
    //     {new: true}
    // )
    // res.status(200).json({
    //     msg: 'Alumno asignado',
    //     updatedUser,
    //     updatedCurse
    // })
}

module.exports = {
    getSucursales,
    postSucursal,
    putSucursal,
    deleteSucursal
}