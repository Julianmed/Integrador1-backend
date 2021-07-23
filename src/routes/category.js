const express = require('express');
const router = express.Router();
const pool = require('../database');

// Todas las categorías.
router.get('/all/:userID', async (req,res)=>{
    try {
        const categorias = await pool.query('SELECT * FROM categoria WHERE usuario = ?', [req.params.userID]);
        res.json(categorias);
    } catch (error) {
        res.json(`Error occurred: ${error}`);
    }
});

// Una categoría
router.get('/:id_categoria', async (req, res) => {
    try {
        const categoria = await pool.query('SELECT * FROM categoria WHERE id_categoria = ?', [req.params.id_categoria]);
        const category = {
            nombre_categoria: categoria[0].nombre_categoria,
            descripcion: categoria[0].descripcion,
            id_categoria: categoria[0].id_categoria,
            usuario: categoria[0].usuario
        }
        res.json(category);
    } catch (error) {
        res.json(`Error occurred: ${error}`);
    }
});

router.post('/', async (req, res) => {
    try{
        await pool.query('INSERT INTO categoria set ?', [req.body]);
        res.json(true);
    }catch (error) {
        res.json(`Error occurred: ${error}`);
    }
    
});

router.delete('/:id', async(req,res) => {
    try{
        await pool.query('DELETE FROM categoria WHERE id_categoria = ?', [req.params.id]);
        res.json(true);
    }catch(error){
        res.json(`Error occurred: ${error}`);
    }
    
});

router.put('/:id', async (req,res) => {
    try{
        const { nombre_categoria, descripcion} = req.body;
        const newCategory = {
            nombre_categoria,
            descripcion
        };
        await pool.query('UPDATE categoria set ? WHERE id_categoria = ?', [newCategory, req.params.id]);
        res.json(true);
    }catch(error){
        res.json(`Error occurred: ${error}`);
    }
});

module.exports = router;