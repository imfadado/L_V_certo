import * as Montadora from '../models/MontadoraModel.js';

export const cadastrar = async (req, res) => {
    try {
        const montadora = req.body;

        // Verificar se o corpo da requisição contém os dados necessários
        if (!montadora || Object.keys(montadora).length === 0) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'Dados do montadora não fornecidos'
            });
        }
        // Validar os dados do veículo
        if (!montadora.nome || !montadora.logotipo || !montadora.data_cadastro || !montadora.data_alteracao) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'Dados do montadora incompletos ou inválidos'
            });
        }
        
        const novoMontadora = await Montadora.cadastrar(montadora);   
        res.status(201).json({
            success: true,
            status: 201,
            message: 'Montadora cadastrado com sucesso',
            montadoraId: novoMontadora
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao cadastrar montadora',
            error: error.message
        });
    }
};

export const consultar = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    try {
        const montadora = await Montadora.consultarPorId(id);
        if (!montadora) {
            return res.status(404).json({ success: false, message: 'Montadora não encontrado' });
        }

        res.status(200).json({ success: true, data: montadora });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao consultar montadora', error: error.message });
    }
};

export const consultarTodos = async (req, res) => {
    const search = req.query.search || '';
    try {
    const montadoras = await Montadora.consultarTodos(search);
        // Verificar se foram encontradas montadoras
        if (montadoras.length === 0) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'Nenhuma montadora encontrado',
                data: []
            });
        }
        res.status(200).json({
            success: true,
            status: 200,
            message: 'Montadora consultadas com sucesso',
            data: montadoras 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao consultar montadora',
            error: error.message
        });
    }
};
export const deletarPorId = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    try {
        const sucesso = await Montadora.deletarPorId(id);

        if (!sucesso) {
            return res.status(404).json({ success: false, message: 'Montadora não encontrada para deletar' });
        }

        res.status(200).json({ success: true, message: 'Montadora deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao deletar montadora', error: error.message });
    }
};
