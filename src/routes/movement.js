const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/allbyuser/:UserID', async (req,res)=>{
    const movimientos = await pool.query('SELECT * FROM movimiento WHERE usuario = ?', [req.params.userID]);
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
module.exports = router;