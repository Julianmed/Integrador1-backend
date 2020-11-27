const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req,res)=>{
    const productos_servicios = await pool.query('SELECT * FROM producto_servicio');
    res.json(productos_servicios);
});

router.get('/:id', async (req,res)=>{
    const producto_servicio = await pool.query('SELECT * FROM producto_servicio WHERE id_producto_servicio = ?', [req.params.id]);
    res.json(producto_servicio);
});

router.post('/', async (req, res) => {
    try {
        await pool.query('INSERT INTO producto_servicio set ?', [req.body]);
        res.json('Data inserted');
    } catch (error) {
        res.json(error.sqlMessage)
    }
})

router.delete('/:id', async(req,res) => {
    await pool.query('DELETE FROM producto_servicio WHERE id_producto_servicio = ?', [req.params.id]);
    res.json(`Product with id ${req.params.id} was deleted`);
});

router.put('/:id', async (req,res) => {
    const { usuario, nombre_producto_servicio, unidad, descripción} = req.body;
    const newProduct = {
        usuario,
        nombre_producto_servicio,
        unidad,
        descripción
    };
    await pool.query('UPDATE producto_servicio set ? WHERE id_producto_servicio = ?', [newProduct, req.params.id]);
    res.json(`Product with id ${req.params.id} was updated`);
});
module.exports = router;