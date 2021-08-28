const express = require("express");
const controller = require("../controllers/candidatosController");

const router = express.Router();
const candidatosController = new controller();

router.get('/listar', candidatosController.listar)
router.get('/:id', candidatosController.id)
router.post('/cadastrar', candidatosController.cadastrar)
router.put('/editar', candidatosController.editar)
router.delete('/deletar', candidatosController.deletar)

module.exports = router