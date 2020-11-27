const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req,res)=>{
    const puntos_adquisicion = await pool.query('SELECT * FROM punto_adquisicion');
    res.json(puntos_adquisicion);
});

router.get('/:id', async (req,res)=>{
    const punto_adquisicion = await pool.query('SELECT * FROM punto_adquisicion WHERE id_punto = ?', [req.params.id]);
    res.json(punto_adquisicion);
});

router.post('/', async (req, res) => {
    try {
        await pool.query('INSERT INTO punto_adquisicion set ?', [req.body]);
        res.json('Data inserted');
    } catch (error) {
        res.json(error.sqlMessage)
    }
})

router.delete('/:id', async(req,res) => {
    await pool.query('DELETE FROM punto_adquisicion WHERE id_punto = ?', [req.params.id]);
    res.json(`acquisition_point with id ${req.params.id} was deleted`);
});

router.put('/:id', async (req,res) => {
    const { usuario, nombre_punto, direccion, descripcion} = req.body;
    const newPoint = {
        usuario,
        nombre_punto,
        direccion,
        descripcion
    };
    await pool.query('UPDATE punto_adquisicion set ? WHERE id_punto = ?', [newPoint, req.params.id]);
    res.json(`acquisition_point with id ${req.params.id} was updated`);
});
module.exports = router;