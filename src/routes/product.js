const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/all/:id_concepto', async (req,res)=>{
    const productos_servicios = await pool.query('SELECT * FROM producto_servicio WHERE id_concepto= ?',[req.params.id_concepto]);
    res.json(productos_servicios);
});

router.get('/:id', async (req,res)=>{
    const producto_servicio = await pool.query('SELECT * FROM producto_servicio WHERE id_producto_servicio = ?', [req.params.id]);
        const product = {
        id_producto_servicio: producto_servicio[0].id_producto_servicio,
        usuario: producto_servicio[0].usuario,
        nombre_producto_servicio: producto_servicio[0].nombre_producto_servicio,
        descripcion: producto_servicio[0].descripcion,
        id_concepto: producto_servicio[0].id_concepto,
        id_categoria: producto_servicio[0].id_categoria,
        unidad: producto_servicio[0].unidad
    };
    res.json(product);
});

router.post('/', async (req, res) => {
    console.log(req.body)
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
    const { nombre_producto_servicio, unidad, descripcion} = req.body;
    console.log(req.body);
    const newProduct = {
        nombre_producto_servicio,
        unidad,
        descripcion
    };
    await pool.query('UPDATE producto_servicio set ? WHERE id_producto_servicio = ?', [newProduct, req.params.id]);
    res.json(`Product with id ${req.params.id} was updated`);
});
module.exports = router;