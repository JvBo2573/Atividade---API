    const express = require('express');
    const pool = require('./db');

    const app = express();
    const PORT = 3000;

    app.use(express.json());
    

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

    

    app.listen(PORT, () => {
        console.log(`servidor rodando com sucesso em http://localhost:${PORT}`);
    });