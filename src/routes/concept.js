const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/all/:id_categoria', async (req,res)=>{
    const conceptos = await pool.query('SELECT * FROM concepto WHERE id_categoria = ?', [req.params.id_categoria]);
    res.json(conceptos);
});

router.get('/allbyuser/:usuario', async (req,res)=>{
    const conceptos = await pool.query('SELECT * FROM concepto WHERE usuario = ?', [req.params.usuario]);
    res.json(conceptos);
});

router.get('/:id', async (req,res)=>{
    const concepto = await pool.query('SELECT * FROM concepto WHERE id_concepto = ?', [req.params.id]);
    const concept = {
        usuario:concepto[0].usuario,
        nombre_concepto: concepto[0].nombre_concepto,
        descripcion: concepto[0].descripcion,
        id_concepto: concepto[0].id_concepto,
        id_categoria: concepto[0].id_categoria
    }
    res.json(concept);
});

router.post('/', async (req, res) => {
    try {
        await pool.query('INSERT INTO concepto set ?', [req.body]);
        res.json(true);
    } catch (error) {
        res.json(error.sqlMessage)
    }
})

router.delete('/:id', async(req,res) => {
    try{
        await pool.query('DELETE FROM concepto WHERE id_concepto = ?', [req.params.id]);
        res.json(true);
    }catch(error){
        res.json(error);
    }
    
});

router.put('/:id', async (req,res) => {
    try {
        const { nombre_concepto, descripcion} = req.body;
        const newConcept = {
            nombre_concepto,
            descripcion
        };
        await pool.query('UPDATE concepto set ? WHERE id_concepto = ?', [newConcept, req.params.id]);
        res.json(true);
    } catch (error) {
        res.json(error);
    }
    
});
module.exports = router;