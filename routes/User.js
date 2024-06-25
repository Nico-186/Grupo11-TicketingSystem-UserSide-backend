const express = require('express');
const router = express.Router();
const userData = require('../services/User');

router.get('/', async function(req, res, next) {
  try {
    res.json(await userData.get());
  } catch (err) {
    console.error(`Error al obtener los usuarios.\n`, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await userData.create(req.body));
    res.sendStatus(200).end();
  } catch (err) {
    console.error(`Error al crear usuario.\n`, err.message);
    next(err);
  }
});

router.put('/', async function(req, res, next) {
  try {
    res.json(await userData.update(req.query.id, req.body));
  } catch (err) {
    console.error(`Error al actualizar usuario.\n`, err.message);
    next(err);
  }
});

router.put('/firstloggin/', async function(req, res, next) {
  try {
    res.json(await userData.updateFirst(req.query.id));
  } catch (err) {
    console.error(`Error al actualizar usuario.\n`, err.message);
    next(err);
  }
});

router.put('/delete', async function(req, res, next) {
  try {
    res.json(await userData.remove(req.query.id));
  } catch (err) {
    console.error(`Error al eliminar usuario.\n`, err.message);
    next(err);
  }
});

module.exports = router;