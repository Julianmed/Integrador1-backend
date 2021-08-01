const express = require('express');
const router = express.Router();
const pool = require('../database');

// Cuál categoría, concepto o producto desea conocer sus movimientos.
router.put('/reportbytype/:userID', async (req,res)=>{
    let tipo = req.body.tipo;
    let idTipo = req.body.idTipo;
    let existFecha = req.body.existFecha;
    let fechaInicial = req.body.fechaInicial;
    let fechaFinal = req.body.fechaFinal;
    let userID = req.params.userID;
    
    try {
        if(existFecha){
            switch(tipo){
                case 'categoría':
                    const categorias = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, pr.id_producto_servicio as id_producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND mo.usuario = ? AND mo.id_categoria = ? ORDER BY mo.fecha', [fechaInicial, fechaFinal, userID, idTipo]);
                    res.json(categorias);
                    break;
        
                case 'concepto':
                    const conceptos = await pool.query('SELECT mo.fecha as fecha, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, pr.id_producto_servicio as id_producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND mo.usuario = ? AND mo.id_concepto = ? ORDER BY mo.fecha', [fechaInicial, fechaFinal, userID, idTipo]);
                    res.json(conceptos);
                    break;
        
                case 'producto':
                    const productos = await pool.query('SELECT mo.fecha as fecha, pr.nombre_producto_servicio as producto_servicio, pr.id_producto_servicio as id_producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND mo.usuario = ? AND mo.id_producto_servicio = ? ORDER BY mo.fecha', [fechaInicial, fechaFinal, userID, idTipo]);
                    res.json(productos);
                    break;
        
                default:
                    res.json("Consulta no válida, 1");
                    break;
            }
        }
        else{
            switch(tipo){
                case 'categoría':
                    const categorias = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, pr.id_producto_servicio as id_producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.usuario = ? AND mo.id_categoria = ? ORDER BY mo.fecha', [userID, idTipo]);
                    res.json(categorias);
                    break;
        
                case 'concepto':
                    const conceptos = await pool.query('SELECT mo.fecha as fecha, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, pr.id_producto_servicio as id_producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.usuario = ? AND mo.id_concepto = ? ORDER BY mo.fecha', [userID, idTipo]);
                    res.json(conceptos);
                    break;
        
                case 'producto':
                    const productos = await pool.query('SELECT mo.fecha as fecha, pr.nombre_producto_servicio as producto_servicio, pr.id_producto_servicio as id_producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.usuario = ? AND mo.id_producto_servicio = ? ORDER BY mo.fecha', [userID, idTipo]);
                    res.json(productos);
                    break;
        
                default:
                    res.json("consulta no válida, 2");
                    break;
            }
        }
    } catch (error) {
        res.json(`Error occurred: ${error}`)
    }
});

// Categoría, concepto o producto, adquirido en un punto de compra específico.
router.put('/reportbypoint/:userID', async (req,res)=>{
    let tipoParaPunto = req.body.tipoParaPunto;
    let idTipoParaPunto = req.body.idTipoParaPunto;
    let idPunto = req.body.idPunto;
    let existFecha = req.body.existFecha;
    let fechaInicial = req.body.fechaInicial;
    let fechaFinal = req.body.fechaFinal;
    let userID = req.params.userID;
    try {
        if(existFecha){
            switch(tipoParaPunto){
                case 'categoría':
                    const categorias = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, pr.id_producto_servicio as id_producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND mo.usuario = ? AND mo.id_categoria = ? AND mo.id_punto = ? ORDER BY mo.fecha', [fechaInicial, fechaFinal,userID, idTipoParaPunto, idPunto]);
                    res.json(categorias);
                    break;
        
                case 'concepto':
                    const conceptos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, pr.id_producto_servicio as id_producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND mo.usuario = ? AND mo.id_concepto = ? AND mo.id_punto = ? ORDER BY mo.fecha', [fechaInicial, fechaFinal,userID, idTipoParaPunto, idPunto]);
                    res.json(conceptos);
                    break;
        
                case 'producto':
                    const productos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, pr.id_producto_servicio as id_producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND mo.usuario = ? AND mo.id_producto_servicio = ? AND mo.id_punto = ? ORDER BY mo.fecha', [fechaInicial, fechaFinal,userID, idTipoParaPunto, idPunto]);
                    res.json(productos);
                    break;
        
                default:
                    res.json("consulta no válida");
            }
        }
    
        else{
            switch(tipoParaPunto){
                case 'categoría':
                    const categorias = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, pr.id_producto_servicio as id_producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.usuario = ? AND mo.id_categoria = ? AND mo.id_punto = ? ORDER BY mo.fecha', [userID, idTipoParaPunto, idPunto]);
                    console.log('resultado: ',categorias);
                    res.json(categorias);
                    break;
        
                case 'concepto':
                    const conceptos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, pr.id_producto_servicio as id_producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.usuario = ? AND mo.id_concepto = ? AND mo.id_punto = ? ORDER BY mo.fecha', [userID, idTipoParaPunto, idPunto]);
                    res.json(conceptos);
                    break;
        
                case 'producto':
                    const productos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, pr.id_producto_servicio as id_producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.usuario = ? AND mo.id_producto_servicio = ? AND mo.id_punto = ? ORDER BY mo.fecha', [userID, idTipoParaPunto, idPunto]);
                    res.json(productos);
                    break;
        
                default:
                    res.json("consulta no válida");
            }
        }
    } catch (error) {
        res.json(`Error occurred: ${error}`);
    }
});

// Movimientos por rango de fecha.
router.put('/reportbydate/:userID', async (req,res)=>{
    let start = req.body.start;
    let finish = req.body.finish;
    let userID = req.params.userID;
    try{
        let elementos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, pr.id_producto_servicio as id_producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND mo.usuario = ? ORDER BY mo.fecha', [start, finish, userID]);

        res.json(elementos);
    }catch(error){
        res.json(`Error occurred: ${error}`)
    }
});

module.exports = router;