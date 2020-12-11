const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/all/:userID', async (req,res)=>{
    const puntos_adquisicion = await pool.query('SELECT * FROM punto_adquisicion WHERE usuario = ?', [req.params.userID]);
    res.json(puntos_adquisicion);
});

router.get('/:id', async (req,res)=>{
    const punto_adquisicion = await pool.query('SELECT * FROM punto_adquisicion WHERE id_punto = ?', [req.params.id]);
    const point_acquisition = {
        id_punto: punto_adquisicion[0].id_punto,
        usuario: punto_adquisicion[0].usuario,
        nombre_punto: punto_adquisicion[0].nombre_punto,
        descripcion: punto_adquisicion[0].descripcion,
        direccion: punto_adquisicion[0].direccion
    };
    res.json(point_acquisition);
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
    const { nombre_punto, direccion, descripcion } = req.body;
    const newPoint = {
        nombre_punto,
        direccion,
        descripcion
    };
    await pool.query('UPDATE punto_adquisicion set ? WHERE id_punto = ?', [newPoint, req.params.id]);
    res.json(`acquisition_point with id ${req.params.id} was updated`);
});
module.exports = router;