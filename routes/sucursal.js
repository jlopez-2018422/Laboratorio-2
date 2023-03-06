const {Router} = require('express');
const { postSucursal, getSucursales, putSucursal, deleteSucursal } = require('../controllers/sucursal');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { esMunicipioValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();
router.get('/mostrar',[
    validarJWT,
], getSucursales);

router.post('/agregar',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('municipio').custom( esMunicipioValido ),
    validarCampos
],postSucursal);

router.put('/editar/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('municipio').custom( esMunicipioValido ),
    validarCampos
], putSucursal);

router.delete('/eliminar/:id',[
    validarJWT,
], deleteSucursal);

module.exports = router;
