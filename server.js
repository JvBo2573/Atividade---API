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


    app.listen(PORT, () => {
        console.log(`servidor rodando com sucesso em http://localhost:${PORT}`);
    });