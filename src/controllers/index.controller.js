const { Pool } = require('pg');


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '12345',
    database: 'appirest',
    port: '5432'
});

//FINCA

const getFinca = async(req, res) => {
    const response = await pool.query('select * from finca as f, administrador as a where a.adm_cedula=f.fin_adm_cedula ');
    res.status(200).json(response.rows);
};

const getFincaId = async(req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('select * from finca as f, administrador as a where a.adm_cedula=f.fin_adm_cedula and f.fin_id = $1', [id]);
    res.json(response.rows);
};

const createFinca = async(req, res) => {
    const { fin_nombre, fin_area, fin_descripcion, fin_adm_cedula } = req.body;
    const response = await pool.query('INSERT INTO finca  ( fin_nombre,fin_area,fin_descripcion,fin_adm_cedula ) VALUES ($1, $2, $3,$4)', [fin_nombre, fin_area, fin_descripcion, fin_adm_cedula]);
    res.json({
        message: 'Finca creada',
        body: {
            Producto: { fin_nombre, fin_area, fin_descripcion, fin_adm_cedula }
        }
    })
};

const updateFinca = async(req, res) => {
    const id = parseInt(req.params.id);
    const { fin_nombre, fin_area, fin_descripcion, fin_adm_cedula } = req.body;

    const response = await pool.query('UPDATE finca  SET  fin_nombre= $1, fin_area = $2, fin_descripcion = $3, fin_adm_cedula=$4 WHERE fin_id = $5', [
        fin_nombre,
        fin_area,
        fin_descripcion,
        fin_adm_cedula,
        id
    ]);
    res.json('Finca actualizada');
    // res.json(`Usuario ${id} actualizado `);
};

const deleteFinca = async(req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM finca  where fin_id = $1', [
        id
    ]);
    res.json(`Finca  ${id} eliminada `);
};

//Lotes

const getLotes = async(req, res) => {
    const response = await pool.query('select l.* from lote as l, finca as f where fin_id=lot_fin_id');
    res.status(200).json(response.rows);
};

const getLotesId = async(req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('select * from lote as l, finca as f where  f.fin_id=l.lot_fin_id and l.lot_fin_id = $1', [id]);
    res.json(response.rows);
};

const getLoteId = async(req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('select * from lote as l, finca as f where  f.fin_id=l.lot_fin_id and l.lot_id = $1', [id]);
    res.json(response.rows);
};

const createLote = async(req, res) => {
    const { lot_area, lot_descripcion, lot_fin_id } = req.body;
    const response = await pool.query('INSERT INTO lote  ( lot_area,lot_descripcion,lot_fin_id) VALUES ($1, $2, $3)', [lot_area, lot_descripcion, lot_fin_id]);
    res.json({
        message: 'Lote creado',
        body: {
            Producto: { lot_area, lot_descripcion, lot_fin_id }
        }
    })
};

const updateLote = async(req, res) => {
    const id = parseInt(req.params.id);
    const { lot_area, lot_descripcion, lot_fin_id } = req.body;

    const response = await pool.query('UPDATE lote  SET  lot_area= $1, lot_descripcion = $2, lot_fin_id = $3 WHERE lot_id = $4', [
        lot_area,
        lot_descripcion,
        lot_fin_id,
        id
    ]);
    res.json('Lote actualizado');
    // res.json(`Usuario ${id} actualizado `);
};

const deleteLote = async(req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM lote  where lot_id = $1', [
        id
    ]);
    res.json(`Lote  ${id} eliminado `);
};


//Cultivos

const getcultivos = async(req, res) => {
    const response = await pool.query('select * from cultivo as c, lote as l, tipocultivo as tp where l.lot_id=c.cul_lot_id and tp.tip_id=c.cul_tip_id');
    res.status(200).json(response.rows);
};

const getcultivos2 = async(req, res) => {
    const response = await pool.query('select c.cul_id, c.cul_nombre, c.cul_gasto, tp.tip_nombre, (select sum(c.cul_gasto) as total from cultivo as c, lote as l, tipocultivo as tp where l.lot_id = c.cul_lot_id and tp.tip_id = c.cul_tip_id) from cultivo as c, lote as l, tipocultivo as tp where l.lot_id = c.cul_lot_id and tp.tip_id = c.cul_tip_id group by c.cul_id, c.cul_nombre, c.cul_gasto, tp.tip_nombre');
    res.status(200).json(response.rows);
};

const getcultivosId = async(req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('select * from cultivo as c, lote as l, tipocultivo as tp where l.lot_id=c.cul_lot_id and tp.tip_id=c.cul_tip_id and c.cul_lot_id = $1', [id]);
    res.json(response.rows);
};

const getcultivoId = async(req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('select * from cultivo as c, lote as l, tipocultivo as tp where l.lot_id=c.cul_lot_id and tp.tip_id=c.cul_tip_id and c.cul_id  = $1', [id]);
    res.json(response.rows);
};

const createCultivo = async(req, res) => {
    const { cul_nombre, cul_inicio, cul_fin, cul_cantidad, cul_lot_id, cul_tip_id } = req.body;
    const response = await pool.query('INSERT INTO cultivo  ( cul_nombre, cul_inicio, cul_fin, cul_cantidad, cul_lot_id, cul_tip_id) VALUES ($1, $2, $3,$4,$5,$6)', [cul_nombre, cul_inicio, cul_fin, cul_cantidad, cul_lot_id, cul_tip_id]);
    res.json({
        message: 'Cltivo creado',
        body: {
            Producto: { cul_nombre, cul_inicio, cul_fin, cul_cantidad, cul_lot_id, cul_tip_id }
        }
    })
};

const updateCultivo = async(req, res) => {
    const id = parseInt(req.params.id);
    const { cul_nombre, cul_inicio, cul_fin, cul_cantidad, cul_lot_id, cul_tip_id } = req.body;

    const response = await pool.query('UPDATE cultivo  SET  cul_nombre= $1, cul_inicio = $2, cul_fin = $3,cul_cantidad=$4,cul_lot_id=$5,cul_tip_id=$6 WHERE cul_id  = $7', [
        cul_nombre,
        cul_inicio,
        cul_fin,
        cul_cantidad,
        cul_lot_id,
        cul_tip_id,
        id
    ]);
    res.json('Cultivo actualizado');
    // res.json(`Usuario ${id} actualizado `);
};

const deleteCultivo = async(req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM cultivo  where cul_id = $1', [
        id
    ]);
    res.json(`Cultivo  ${id} eliminado `);
};

//Operaciones


const getOperaciones = async(req, res) => {
    const response = await pool.query('select * from operacion as o, cultivo as c where c.cul_id=o.ope_cul_id');
    res.status(200).json(response.rows);
};

const getOperacionesId = async(req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('select * from operacion as o, cultivo as c where c.cul_id=o.ope_cul_id and  o.ope_cul_id = $1', [id]);
    res.json(response.rows);
};

const getOperacionId = async(req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('select * from operacion as o, cultivo as c where c.cul_id=o.ope_cul_id and  o.ope_id  = $1', [id]);
    res.json(response.rows);
};

const createOperacion = async(req, res) => {
    const { ope_nombre, ope_tiempo, ope_fecha, ope_fin, ope_cul_id } = req.body;
    const response = await pool.query('INSERT INTO operacion  ( ope_nombre, ope_tiempo, ope_fecha, ope_fin, ope_cul_id) VALUES ($1, $2, $3,$4,$5)', [ope_nombre, ope_tiempo, ope_fecha, ope_fin, ope_cul_id]);
    res.json({
        message: 'Operacion creada',
        body: {
            Producto: { ope_nombre, ope_tiempo, ope_fecha, ope_fin, ope_cul_id }
        }
    })
};

const updateOperacion = async(req, res) => {
    const id = parseInt(req.params.id);
    const { ope_nombre, ope_tiempo, ope_fecha, ope_fin, ope_cul_id } = req.body;

    const response = await pool.query('UPDATE operacion  SET  ope_nombre= $1, ope_tiempo = $2, ope_fecha = $3, ope_fin=$4, ope_cul_id=$5 WHERE ope_id = $6', [
        ope_nombre,
        ope_tiempo,
        ope_fecha,
        ope_fin,
        ope_cul_id,
        id
    ]);
    res.json('Operacion actualizada');
    // res.json(`Usuario ${id} actualizado `);
};

const deleteOperacion = async(req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM operacion  where ope_id = $1', [
        id
    ]);
    res.json(`Operacion ${id} eliminada`);
};


//Insumo  en proceso 

const getInsumo = async(req, res) => {
    const response = await pool.query('select * from insumo');
    res.status(200).json(response.rows);
};

const getInsumoId = async(req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('select * from insumo as i where  t.tra_cedula = $1', [id]);
    res.json(response.rows);
};

const createInsumo = async(req, res) => {
    const { tra_nombre, tra_telefono, tra_foto } = req.body;
    const response = await pool.query('INSERT INTO trabajador  ( tra_nombre,tra_telefono,tra_foto ) VALUES ($1, $2, $3)', [tra_nombre, tra_telefono, tra_foto]);
    res.json({
        message: 'Trabajador creado',
        body: {
            Producto: { tra_nombre, tra_telefono, tra_foto }
        }
    })
};

const updateInsumo = async(req, res) => {
    const id = parseInt(req.params.id);
    const { tra_nombre, tra_telefono, tra_foto } = req.body;

    const response = await pool.query('UPDATE trabajador  SET  tra_nombre= $1, tra_telefono = $2, tra_foto =$3 WHERE lot_id = $4', [
        tra_nombre,
        tra_telefono,
        tra_foto,
        id
    ]);
    res.json('Trabajador actualizado');
    // res.json(`Usuario ${id} actualizado `);
};

const deleteInsumo = async(req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM trabajador  where tra_cedula  = $1', [
        id
    ]);
    res.json(`Trabajador ${id} eliminado`);
};


//Trabajadores

const getTrabajador = async(req, res) => {
    const response = await pool.query('select * from trabajador');
    res.status(200).json(response.rows);
};

const getTrabajadorId = async(req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('select * from trabajador as t where  t.tra_cedula = $1', [id]);
    res.json(response.rows);
};

const createTrabajador = async(req, res) => {
    const { tra_nombre, tra_telefono, tra_foto } = req.body;
    const response = await pool.query('INSERT INTO trabajador  ( tra_nombre,tra_telefono,tra_foto ) VALUES ($1, $2, $3)', [tra_nombre, tra_telefono, tra_foto]);
    res.json({
        message: 'Trabajador creado',
        body: {
            Producto: { tra_nombre, tra_telefono, tra_foto }
        }
    })
};

const updateTrabajador = async(req, res) => {
    const id = parseInt(req.params.id);
    const { tra_nombre, tra_telefono, tra_foto } = req.body;

    const response = await pool.query('UPDATE trabajador  SET  tra_nombre= $1, tra_telefono = $2, tra_foto =$3 WHERE tra_cedula = $4', [
        tra_nombre,
        tra_telefono,
        tra_foto,
        id
    ]);
    res.json('Trabajador actualizado');
    // res.json(`Usuario ${id} actualizado `);
};

const deleteTrabajador = async(req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM trabajador  where tra_cedula  = $1', [
        id
    ]);
    res.json(`Trabajador ${id} eliminado`);
};


//Proveedor 

const getProveedor = async(req, res) => {
    const response = await pool.query('select * from proveedor');
    res.status(200).json(response.rows);
};

const getProveedorId = async(req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('select * from proveedor as p where  p.pro_nit = $1', [id]);
    res.json(response.rows);
};

const createProveedor = async(req, res) => {
    const { pro_nit, pro_razonsocial, pro_email } = req.body;
    const response = await pool.query('INSERT INTO proveedor  ( pro_nit,pro_razonsocial,pro_email ) VALUES ($1, $2, $3)', [pro_nit, pro_razonsocial, pro_email]);
    res.json({
        message: 'Proveedor creado',
        body: {
            Producto: { pro_nit, pro_razonsocial, pro_email }
        }
    })
};

const updateProveedor = async(req, res) => {
    const id = parseInt(req.params.id);
    const { pro_nit, pro_razonsocial, pro_email } = req.body;

    const response = await pool.query('UPDATE proveedor  SET  pro_nit= $1, pro_razonsocial = $2, pro_email =$3 WHERE pro_nit = $4', [
        pro_nit,
        pro_razonsocial,
        pro_email,
        id
    ]);
    res.json('Proveedor actualizado');
    // res.json(`Usuario ${id} actualizado `);
};

const deleteProveedor = async(req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM proveedor  where pro_nit = $1', [
        id
    ]);
    res.json(`Proveedor ${id} eliminado`);
};


module.exports = {
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

};