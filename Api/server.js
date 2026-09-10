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
            console.log(resultado.rows);
            res.json(resultado.rows);
        });
    });

    // rota 2
    

    app.get('/produtos/:id', (req, res)=>{
        const id = req.params.id;
        const sql = `SELECT * FROM produtos WHERE id = ${id}`

        pool.query (sql, (erro, resultado) =>{

            if(erro){
                console.log(erro)

                return res.status(500).json({
                    mensagem: 'Não foi possivel buscar o produto'
                });
            }

            if(resultado.rows.length === 0){
                return res.status(404).json({
                    mensagem: `Não foi possivel encontrar o produto ${id}`
                });
            }
            res.json(resultado.rows[0]);
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
            res.json({
                resultado, 
                mensagem: 'Produto cadastrado com sucesso!'
            });
        });
    });


    // rota 4 delete

    app.delete('/produtos/:id', (req, res)=>{
        const id = req.params.id;
        const sql = `
        DELETE FROM produtos where id = $1
        `;
    
        pool.query (sql, [id],(erro, resultado)=>{
            if (erro) {
                console.log(erro);
                return res.status(500).json({
                    mensagem: 'Erro ao excluir produto'
                });
            }

            res.json({
                mensagem: 'Produto excluído com sucesso'
            });
        });
    });

    app.listen(PORT, () => {
        console.log(`servidor rodando com sucesso em http://localhost:${PORT}`);
    });