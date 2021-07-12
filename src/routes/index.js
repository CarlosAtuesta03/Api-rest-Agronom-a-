const { Router } = require('express');
const router = Router();

const {
    //Finca
    getFinca,
    getFincaId,
    createFinca,
    updateFinca,
    deleteFinca,
    //Lote
    getLotes,
    getLotesId,
    getLoteId,
    createLote,
    updateLote,
    deleteLote,

    //Cultivo
    getcultivos,
    getcultivos2,
    getcultivosId,
    getcultivoId,
    createCultivo,
    updateCultivo,
    deleteCultivo,

    //Operaciones
    getOperaciones,
    getOperacionesId,
    getOperacionId,
    createOperacion,
    updateOperacion,
    deleteOperacion,

    //Trabajador
    getTrabajador,
    getTrabajadorId,
    createTrabajador,
    updateTrabajador,
    deleteTrabajador,

    //Proveedor 
    getProveedor,
    getProveedorId,
    createProveedor,
    updateProveedor,
    deleteProveedor

} = require('../controllers/index.controller');

//FINCA
router.get('/finca', getFinca);
router.get('/finca/:id', getFincaId);
router.post('/finca', createFinca);
router.put('/finca/:id', updateFinca);
router.delete('/finca/:id', deleteFinca);

//Lote
router.get('/lotes', getLotes);
router.get('/lotes/:id', getLotesId);
router.get('/lote/:id', getLoteId);
router.post('/lote', createLote);
router.put('/lote/:id', updateLote);
router.delete('/lote/:id', deleteLote);

//Cultivo
router.get('/cultivos', getcultivos);
router.get('/cultivos2', getcultivos2);
router.get('/cultivos/:id', getcultivosId);
router.get('/cultivo/:id', getcultivoId);
router.post('/cultivo', createCultivo);
router.put('/cultivo/:id', updateCultivo);
router.delete('/cultivo/:id', deleteCultivo);

//Operaciones
router.get('/operaciones', getOperaciones);
router.get('/operaciones/:id', getOperacionesId);
router.get('/operacion/:id', getOperacionesId);
router.post('/operacion', createOperacion);
router.put('/operacion/:id', updateOperacion);
router.delete('/operacion/:id', deleteOperacion);

//Trabajador
router.get('/trabajador', getTrabajador);
router.get('/trabajador/:id', getTrabajadorId);
router.post('/trabajador', createTrabajador);
router.put('/trabajador/:id', updateTrabajador);
router.delete('/trabajador/:id', deleteTrabajador);

//Proveedor 
router.get('/proveedor', getProveedor);
router.get('/proveedor/:id', getProveedorId);
router.post('/proveedor', createProveedor);
router.put('/proveedor/:id', updateProveedor);
router.delete('/proveedor/:id', deleteProveedor);

module.exports = router;