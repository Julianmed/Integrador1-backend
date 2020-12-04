const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/all/:id_categoria', async (req,res)=>{
    const conceptos = await pool.query('SELECT * FROM concepto WHERE id_categoria = ?', [req.params.id_categoria]);
    res.json(conceptos);
});

router.get('/:id', async (req,res)=>{
    const concepto = await pool.query('SELECT * FROM concepto WHERE id_concepto = ?', [req.params.id]);
    res.json(concepto);
});

router.post('/', async (req, res) => {
    try {
        await pool.query('INSERT INTO concepto set ?', [req.body]);
        res.json('Data inserted');
    } catch (error) {
        res.json(error.sqlMessage)
    }
})

router.delete('/:id', async(req,res) => {
    await pool.query('DELETE FROM concepto WHERE id_concepto = ?', [req.params.id]);
    res.json(`Concept with id ${req.params.id} was deleted`);
});

router.put('/:id', async (req,res) => {
    const { usuario, nombre_concepto, descripcion} = req.body;
    const newConcept = {
        usuario,
        nombre_concepto,
        descripcion
    };
    await pool.query('UPDATE concepto set ? WHERE id_concepto = ?', [newConcept, req.params.id]);
    res.json(`Concepto with id ${req.params.id} was updated with data ${newCategory}`);
});
module.exports = router;