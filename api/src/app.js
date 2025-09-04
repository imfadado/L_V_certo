import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Importando as rotas
import veiculoRoute from './routes/veiculoRoute.js';
import categoriaRoute from './routes/categoriaRoute.js'
import montadoraRoute from './routes/montadoraRoute.js'

const app = express();

app.use(cors());
app.use(express.json());


// Rotas de públicas
app.get('/',(req,res)=>{
    const rootDomain = req.protocol + '://' + req.get('host');
    res.status(200).json({     
        status_server: 'ok',
        dominio_raiz : rootDomain,
        atualização: '14/09/2024 - 18:42',
        rotas:{
            'GET - Consultar veículo': `${rootDomain}/api/veiculo`,
            'GET - Consultar todos os veículos': `${rootDomain}/api/veiculos`,
            'POST - Cadastrar veículo':`${rootDomain}/api/veiculo`,
            'DELETE - Deletar veiculo': `${rootDomain}/api/veiculo`,

            'GET - Consultar categoria': `${rootDomain}/api/categoria`,
            'GET - Consultar todas as categorias': `${rootDomain}/api/categorias`,
            'POST - Consultar categoria': `${rootDomain}/api/categoria`,
            'DELETE - Deletar categoria': `${rootDomain}/api/categoria`,

            'GET - Consultar montadora': `${rootDomain}/api/montadora`,
            'GET - Consultar todas as montadoras': `${rootDomain}/api/montadoras`,
            'POST - Consultar montadora': `${rootDomain}/api/montadora`,
            'DELETE - Deletar montadora': `${rootDomain}/api/montadora`
        }
    });
});

// Configurando as rotas
app.use('/api', veiculoRoute);
app.use('/api', categoriaRoute);
app.use('/api', montadoraRoute);

const PORT = process.env.PORT || 3000; 
app.listen(PORT,()=>{
    console.log('Sistema inicializado: ', `Acesso: http://localhost:${PORT}`);
});
