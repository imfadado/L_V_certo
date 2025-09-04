import pool from "../database/data.js";


export const cadastrar = async (montadora) => {    
    // Obter uma conexão do pool
    const cx = await pool.getConnection(); 
    try {
        // Desestruturar o objeto veiculo
        const { 
            nome,
            logotipo,
            data_cadastro,
            data_alteracao, } = montadora; 

        // Query para inserir um novo veículo
        const query = `INSERT INTO montadora (nome, logotipo, data_cadastro, data_alteracao) VALUES (?, ?, ?, ?)`;

        // Executar a query com os valores do veículo
        const [result] = await cx.query(query,[nome, logotipo, data_cadastro, data_alteracao]);
    
        // Verificar se a inserção foi bem-sucedida
        if (result.affectedRows === 0) {
            throw new Error("Erro ao cadastrar montadora");
        } 
        // Retornar o ID do veículo inserido
        return result.insertId; 
    } catch (error) {
        // Lançar o erro para ser tratado pelo chamador
        throw error; 
    } finally{
        if (cx) {
            cx.release(); // Liberar a conexão de volta ao pool
        }
    }
}

export const consultarTodos = async (search) => {
    // Obter uma conexão do pool
    const cx = await pool.getConnection(); 
    try {
        // Query para consultar todos os veículos
        let query = `SELECT * FROM montadora`;
        let params = [];

        // Verificar se há um termo de pesquisa
        if (search) {
            query += ` WHERE montadora LIKE ?`;
            params.push(`%${search}%`);
        }

        // Executar a query com os parâmetros
        const [rows] = await cx.query(query, params);
        
        // Retornar os resultados da consulta
        return rows; 
    } catch (error) {
        // Lançar o erro para ser tratado pelo chamador
        throw error; 
    } finally {
        if (cx) {
            cx.release(); // Liberar a conexão de volta ao pool
        }
    }
} 

export const consultarPorId = async (id) => {
    const cx = await pool.getConnection();
    try {
        const query = `SELECT * FROM montadora WHERE id = ?`;
        const [rows] = await cx.query(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    } finally {
        cx.release();
    }
};

export const deletarPorId = async (id) => {
    const cx = await pool.getConnection();
    try {
        const query = `DELETE FROM montadora WHERE id = ?`;
        const [result] = await cx.query(query, [id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    } finally {
        cx.release();
    }
};