<?php
// Verifica se a requisição foi feita via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém a informação "data" do formulário
    $data = $_POST["data"];

    // Conecta ao banco de dados
    $servername = "db4free.net"; // Endereço do servidor
    $username = "ramon141"; // Nome de usuário do banco de dados
    $password = '9i@2R9$m.nbTAjK'; // Senha do banco de dados
    $dbname = "ramon141"; // Nome do banco de dados

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifica a conexão
    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    // Prepara e executa a consulta para inserir os dados no banco
    $sql = "INSERT INTO cardapio (cardapio) VALUES ('$data')";

    if ($conn->query($sql) === TRUE) {
        echo "Dados inseridos com sucesso no banco de dados!";
    } else {
        echo "Erro ao inserir dados: " . $conn->error;
    }

    // Fecha a conexão com o banco de dados
    $conn->close();
}
?>
