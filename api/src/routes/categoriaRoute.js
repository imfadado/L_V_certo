import express from 'express';
import * as categoria from '../controllers/categoriaController.js';

const router = express.Router();

router.get('/categoria/:id',categoria.consultarPorId);
router.get('/categorias',categoria.consultarTodos);
router.post('/categoria',categoria.cadastrar);
router.delete('/categoria/:id',categoria.deletarPorId);

export default router;