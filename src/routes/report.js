const express = require('express');
const router = express.Router();
const pool = require('../database');

// Cuál categoría, concepto o producto desea conocer sus movimientos.
router.get('/reportbytype/:userID', async (req,res)=>{
    let tipo = req.body.tipo;
    let idTipo = req.body.idTipo;
    let existFecha = req.body.existFecha;
    let fechaInicial = req.body.fechaInicial;
    let fechaFinal = req.body.fechaFinal;
    let userID = req.params.userID;
    
    try {
        if(existFecha){
            switch(tipo){
                case 'categoria':
                    const categorias = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND mo.usuario = ? AND mo.id_categoria = ?', [fechaInicial, fechaFinal, userID, idTipo]);
                    res.json(categorias);
                    break;
        
                case 'concepto':
                    const conceptos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND mo.usuario = ? AND mo.id_concepto = ?', [fechaInicial, fechaFinal, userID, idTipo]);
                    res.json(conceptos);
                    break;
        
                case 'producto':
                    const productos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND mo.usuario = ? AND mo.id_producto_servicio = ?', [fechaInicial, fechaFinal, userID, idTipo]);
                    res.json(productos);
                    break;
        
                default:
                    res.json("Consulta no válida");
            }
        }
        else{
            switch(tipo){
                case 'categoria':
                    const categorias = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.usuario = ? AND mo.id_categoria = ?', [userID, idTipo]);
                    res.json(categorias);
                    break;
        
                case 'concepto':
                    const conceptos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.usuario = ? AND mo.id_concepto = ?', [userID, idTipo]);
                    res.json(conceptos);
                    break;
        
                case 'producto':
                    const productos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.usuario = ? AND mo.id_producto_servicio = ?', [userID, idTipo]);
                    res.json(productos);
                    break;
        
                default:
                    res.json("consulta no válida");
            }
        }
    } catch (error) {
        res.json(`Error occurred: ${error}`)
    }
});

// Categoría, concepto o producto, adquirido en un punto de compra específico.
router.get('/reportbypoint/:userID', async (req,res)=>{
    let tipo = req.body.tipo;
    let idTipo = req.body.idTipo;
    let idPunto = req.body.idPunto;
    let existFecha = req.body.existFecha;
    let fechaInicial = req.body.fechaInicial;
    let fechaFinal = req.body.fechaFinal;
    let userID = req.params.userID;

    try {
        if(existFecha){
            switch(tipo){
                case 'categoria':
                    const categorias = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND mo.usuario = ? AND mo.id_concepto = ? AND mo.id_punto = ?', [fechaInicial, fechaFinal,userID, idTipo, idPunto]);
                    res.json(categorias);
                    break;
        
                case 'concepto':
                    const conceptos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND mo.usuario = ? AND mo.id_concepto = ? AND mo.id_punto = ?', [fechaInicial, fechaFinal,userID, idTipo, idPunto]);
                    res.json(conceptos);
                    break;
        
                case 'producto':
                    const productos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND mo.usuario = ? AND mo.id_concepto = ? AND mo.id_punto = ?', [fechaInicial, fechaFinal,userID, idTipo, idPunto]);
                    res.json(productos);
                    break;
        
                default:
                    res.json("consulta no válida");
            }
        }
    
        else{
            switch(tipo){
                case 'categoria':
                    const categorias = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.usuario = ? AND mo.id_concepto = ? AND mo.id_punto = ?', [userID, idTipo, idPunto]);
                    res.json(categorias);
                    break;
        
                case 'concepto':
                    const conceptos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.usuario = ? AND mo.id_concepto = ? AND mo.id_punto = ?', [userID, idTipo, idPunto]);
                    res.json(conceptos);
                    break;
        
                case 'producto':
                    const productos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.usuario = ? AND mo.id_concepto = ? AND mo.id_punto = ?', [userID, idTipo, idPunto]);
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
router.get('/reportbydate/:userID', async (req,res)=>{
    let start = req.body.start;
    let finish = req.body.finish;
    let userID = req.params.userID;
    
    try{
        //const movimientos = await pool.query('SELECT * FROM movimiento WHERE fecha BETWEEN ? AND ? AND usuario = ?', [start, finish, userID]);
        let elementos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND mo.usuario = ?', [start, finish, userID]);
        //let elementos = await joinData(movimientos);
        res.json(elementos);
    }catch(error){
        res.json(`Error occurred: ${error}`)
    }
});

async function joinData (movimientos){
    // for(let movimiento of movimientos){
    //     let consulta = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.id_categoria = ? AND mo.id_concepto = ? AND mo.id_producto_servicio = ? AND mo.id_punto = ?', [movimiento.id_categoria, movimiento.id_concepto, movimiento.id_producto_servicio, movimiento.id_punto]);
    //     if(consulta.length > 0){
    //         elementos.push(consulta[0]);
    //     }
    // }
    let elementos = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.fecha BETWEEN ? AND ? AND usuario = ?', [start, finish, userID]);
    return elementos;
};

module.exports = router;