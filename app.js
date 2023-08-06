const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Importa o pacote cors

const app = express();

app.use(cors()); // Aplica o middleware cors a todas as rotas

app.use(express.json());

// Configuração do banco de dados
const dbConfig = {
    host: 'db4free.net',
    user: 'ramon141',
    password: '9i@2R9$m.nbTAjK',
    database: 'ramon141'
};

// Função para obter o último cardápio criado
app.get('/list', (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    const sql = "SELECT * FROM cardapio ORDER BY id DESC LIMIT 1";
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Erro na conexão com o banco de dados:", error);
            connection.close();
            return res.status(500).json({ error: "Erro na conexão com o banco de dados" });
        }

        if (results.length > 0) {
            const result = results[0];
            result.cardapio = JSON.parse(result.cardapio);

            // Retorna o resultado como JSON
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Nenhum resultado encontrado" });
        }

        // Fecha a conexão com o banco de dados
        connection.close();
    });
});

// Rota POST para inserir dados no banco de dados
app.post('/create', (req, res) => {
    const data = req.body.data; // Obtém a informação "data" do corpo da requisição

    // Criação da conexão com o banco de dados usando mysql2
    const connection = mysql.createConnection(dbConfig);

    // Verifica a conexão
    if (!connection) {
        return res.status(500).json({ error: "Erro na conexão com o banco de dados" });
    }

    // Escapar caracteres especiais para evitar SQL injection
    const escapedData = connection.escape(data);

    // Prepara e executa a consulta para inserir os dados no banco
    const sql = `INSERT INTO cardapio (cardapio) VALUES (${escapedData})`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Erro na inserção de dados:", error);
            connection.close();
            return res.status(500).json({ error: "Erro na inserção de dados" });
        }

        // Retorna uma resposta de sucesso
        res.status(200).json({ message: "Dados inseridos com sucesso no banco de dados!" });

        // Fecha a conexão com o banco de dados
        connection.close();
    });
});

// Inicie o servidor na porta 3000 (ou a porta de sua escolha)
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
