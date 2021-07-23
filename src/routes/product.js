const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/all/:id_concepto', async (req,res)=>{
    try {
        const productos_servicios = await pool.query('SELECT * FROM producto_servicio WHERE id_concepto= ?',[req.params.id_concepto]);
        res.json(productos_servicios);
    } catch (error) {
        res.json(`Error occurred: ${error}`)
    }
});

router.get('/allbyuser/:usuario', async (req,res)=>{
    try {
        const productos = await pool.query('SELECT * FROM producto_servicio WHERE usuario = ?', [req.params.usuario]);
        res.json(productos);
    } catch (error) {
        res.json(`Error occurred: ${error}`)
    }
});

router.get('/:id', async (req,res)=>{
    try {
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
    } catch (error) {
        res.json(`Error occurred: ${error}`)
    }
});

router.post('/', async (req, res) => {
    try {
        await pool.query('INSERT INTO producto_servicio set ?', [req.body]);
        res.json(true);
    } catch (error) {
        res.json(`Error occurred: ${error}`)
    }
})

router.delete('/:id', async(req,res) => {
    try {
        await pool.query('DELETE FROM producto_servicio WHERE id_producto_servicio = ?', [req.params.id]);
        res.json(`Product with id ${req.params.id} was deleted`);
    } catch (error) {
        res.json(`Error occurred: ${error}`);
    }
    
});

router.put('/:id', async (req,res) => {
    try {
        const { nombre_producto_servicio, unidad, descripcion} = req.body;
        const newProduct = {
            nombre_producto_servicio,
            unidad,
            descripcion
        };
        await pool.query('UPDATE producto_servicio set ? WHERE id_producto_servicio = ?', [newProduct, req.params.id]);
        res.json(true);
    } catch (error) {
        res.json(`Error occurred: ${error}`);
    }
});
module.exports = router;