const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req,res)=>{
    const movimientos = await pool.query('SELECT * FROM movimiento');
    res.json(movimientos);
});

router.get('/:id', async (req,res)=>{
    const movimiento = await pool.query('SELECT * FROM movimiento WHERE consecutivo = ?', [req.params.id]);
    res.json(movimiento);
});

router.post('/', async (req, res) => {
    try {
        await pool.query('INSERT INTO movimiento set ?', [req.body]);
        res.json('Data inserted');
    } catch (error) {
        res.json(error.sqlMessage)
    }
})

router.delete('/:id', async(req,res) => {
    await pool.query('DELETE FROM movimiento WHERE consecutivo = ?', [req.params.id]);
    res.json(`movement with consecutive ${req.params.id} was deleted`);
});

router.put('/:id', async (req,res) => {
    const { usuario, id_punto, id_categoría, id_concepto, id_producto_servicio, fecha, cantidad, valor_unitario, tipo_movimiento} = req.body;
    const newMovement = {
        usuario,
        id_punto,
        id_categoría,
        id_concepto,
        id_producto_servicio,
        fecha,
        cantidad,
        valor_unitario,
        tipo_movimiento
    };
    await pool.query('UPDATE concepto set ? WHERE consecutivo = ?', [newMovement, req.params.id]);
    res.json(`Movement with consecutive ${req.params.id} was updated with data ${newCategory}`);
});
module.exports = router;