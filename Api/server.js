    const express = require('express');
    const pool = require('./db');

    const app = express();
    const PORT = 3000;

    app.use(express.json());
    const cors = require('cors');
    app.use(cors());
    

    // rota 1

    app.get('/produtos', (req, res)=>{
        const sql = 'SELECT * FROM produtos';

        pool.query(sql, (erro, resultado)=>{
            console.log(resultado);
            res.json(resultado);
        });
    });

    // rota 2
    

    app.get('/produtos/:id', (req, res)=>{
        const id = req.params.id;
        const sql = `SELECT * FROM produtos WHERE id = ${id}`

        pool.query (sql, (erro, resultado) =>{
            res.json(resultado.rows);
        });
    });

    // rota 3

    app.post('/produtos', (req, res)=>{
        const nome = req.body.nome;
        const preco = req.body.preco;
        const descricao = req.body.descricao;

        const sql = `INSERT INTO produtos (nome, preco, descricao) VALUES
        ('${nome}', '${preco}', '${descricao}')
        `;

        pool.query (sql, (erro, resultado)=>{
            res.json(resultado);
        });
    });

    app.listen(PORT, () => {
        console.log(`servidor rodando com sucesso em http://localhost:${PORT}`);
    });