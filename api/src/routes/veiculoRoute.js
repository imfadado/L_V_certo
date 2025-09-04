import express from 'express';
import * as veiculo from '../controllers/veiculoController.js';

const router = express.Router();

router.get('/veiculo/:id',veiculo.consultarPorId);
router.get('/veiculos',veiculo.consultarTodos);
router.post('/veiculo',veiculo.cadastrar);
router.delete('/veiculo/:id', veiculo.deletarPorId);

export default router;