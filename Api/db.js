const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Jvbo@2573',
    port: 5432
});

pool.connect()
    .then(() => {
        console.log('Banco de dados conectado com sucesso!');
    })
    .catch((erro) => {
        console.error('Erro ao conectar ao banco:', erro);
    });

module.exports = pool;