const express = require('express');
const router = express.Router();
const pool = require('../database');

// Todas las categorías.
router.get('/', async (req,res)=>{
    const categorias = await pool.query('SELECT * FROM categoria');
    res.json(categorias);
});

// Una categoría
router.get('/:nombre', async (req, res) => {
    const categoria = await pool.query('SELECT * FROM categoria WHERE nombre_categoria = ?', [req.params.nombre]
    );
    res.json(categoria);
});

router.post('/', async (req, res) => {
    await pool.query('INSERT INTO categoria set ?', [req.body]);
    res.json('Data inserted');
});

router.delete('/:id', async(req,res) => {
    await pool.query('DELETE FROM categoria WHERE id_categoria = ?', [req.params.id]);
    res.json(`Category with id ${req.params.id} was deleted`);
});

router.put('/:id', async (req,res) => {
    const { usuario, nombre_categoria, descripcion} = req.body;
    const newCategory = {
        usuario,
        nombre_categoria,
        descripcion
    };
    await pool.query('UPDATE categoria set ? WHERE id_categoria = ?', [newCategory, req.params.id]);
    res.json(`Category with id ${req.params.id} was updated with data ${newCategory}`);
});

module.exports = router;