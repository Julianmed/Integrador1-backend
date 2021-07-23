const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/allbyuser/:userID', async (req,res)=>{
    try {
        const movimientos = await pool.query('SELECT * FROM movimiento WHERE usuario = ?', [req.params.userID]);
        res.json(movimientos);
    } catch (error) {
        res.json(`Error occurred: ${error}`)
    }
});

router.post('/allbydate', async (req,res)=>{
    try{
        const movimientos = await pool.query('SELECT * FROM movimiento WHERE fecha BETWEEN ? AND ? AND usuario = ?', [req.body.start, req.body.finish, req.body.userID]);
        let elementos =[];
        for(let movimiento of movimientos){
            let consulta = await pool.query('SELECT mo.fecha as fecha, ca.nombre_categoria as categoria, co.nombre_concepto as concepto, pr.nombre_producto_servicio as producto_servicio, mo.cantidad as cantidad, mo.valor_unitario as valor, mo.tipo_movimiento as movimiento, pa.nombre_punto as punto FROM movimiento AS mo INNER JOIN categoria AS ca ON mo.id_categoria = ca.id_categoria INNER JOIN concepto AS co ON mo.id_concepto = co.id_concepto INNER JOIN producto_servicio AS pr ON mo.id_producto_servicio = pr.id_producto_servicio INNER JOIN punto_adquisicion AS pa ON mo.id_punto = pa.id_punto WHERE mo.id_categoria = ? AND mo.id_concepto = ? AND mo.id_producto_servicio = ? AND mo.id_punto = ? AND mo.fecha = ?', [movimiento.id_categoria, movimiento.id_concepto, movimiento.id_producto_servicio, movimiento.id_punto, movimiento.fecha])
            elementos.push(consulta[0]);
        }
        console.log("resultado: ", elementos);
        res.json(elementos);
    }catch(error){
        res.json(`Error occurred: ${error}`)
    }
});

router.get('/:id', async (req,res)=>{
    try {
        const movimiento = await pool.query('SELECT * FROM movimiento WHERE consecutivo = ?', [req.params.id]);
        res.json(movimiento);
    } catch (error) {
        res.json(`Error occurred: ${error}`)
    }
});

router.post('/', async (req, res) => {
    try {
        await pool.query('INSERT INTO movimiento set ?', [req.body]);
        res.json(true);

    } catch (error) {
        res.json(`Error occurred: ${error}`)
    }
})

router.delete('/:id', async(req,res) => {
    try {
        await pool.query('DELETE FROM movimiento WHERE consecutivo = ?', [req.params.id]);
        res.json(true);
    } catch (error) {
        res.json(`Error occurred: ${error}`)
    }
    
});
module.exports = router;