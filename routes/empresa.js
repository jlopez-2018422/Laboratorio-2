const {Router} = require('express');
const { getEmpresas, postEmpresa, putEmpresa, deleteEmpresa, registrarEmpresa, getMisSucursales } = require('../controllers/empresa');
const { check } = require('express-validator');

const { existeEmpresaPorId, emailExiste, nombreExiste, esTipoValido} = require('../helpers/db-validators');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.get('/mostrar', getEmpresas);

router.post('/agregar',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(nombreExiste),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('tipo').custom( esTipoValido ),
    validarCampos
], postEmpresa);

router.put('/editar/', [
    validarJWT,
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeEmpresaPorId ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(nombreExiste),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    validarCampos
], putEmpresa);

router.delete('/eliminar/',[
    validarJWT
], deleteEmpresa);

router.post('/registrar',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('tipo').custom( esTipoValido ),
    validarCampos
], registrarEmpresa );



router.get('/misSucursales',[
    validarJWT
] ,getMisSucursales);

// router.delete('/eliminarMiUsuario/:id',[
//     validarJWT
// ], deleteMyUser);
// router.put('/editarMiUsuario/:id',[
//     validarJWT
// ], putMyUser)



module.exports = router;
