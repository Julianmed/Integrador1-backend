const express = require('express');
const router = express.Router();
const pool = require('../database');

// Todas las categorías.
router.get('/all/:userID', async (req,res)=>{
    const categorias = await pool.query('SELECT * FROM categoria WHERE usuario = ?', [req.params.userID]);
    res.json(categorias);
});

// Una categoría
router.get('/:id_categoria', async (req, res) => {
    const categoria = await pool.query('SELECT * FROM categoria WHERE id_categoria = ?', [req.params.id_categoria]);
    const category = {
        nombre_categoria: categoria[0].nombre_categoria,
        descripcion: categoria[0].descripcion,
        id_categoria: categoria[0].id_categoria,
        usuario: categoria[0].usuario
    }
    res.json(category);
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
    console.log(req.body);
    const { nombre_categoria, descripcion} = req.body;
    const newCategory = {
        nombre_categoria,
        descripcion
    };
    await pool.query('UPDATE categoria set ? WHERE id_categoria = ?', [newCategory, req.params.id]);
    res.json(`Category with id ${req.params.id} was updated`);
});

module.exports = router;