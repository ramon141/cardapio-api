<?php
// Configuração do banco de dados
$servername = "db4free.net"; // Endereço do servidor
$username = "ramon141"; // Nome de usuário do banco de dados
$password = '9i@2R9$m.nbTAjK'; // Senha do banco de dados
$dbname = "ramon141"; // Nome do banco de dados

// Criação da conexão com o banco de dados usando PDO
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, '9i@2R9$m.nbTAjK');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta para obter o último cardápio criado (maior ID)
    $sql = "SELECT * FROM cardapio ORDER BY id DESC LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    // Obtém o resultado da consulta
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Fecha a conexão com o banco de dados
    $conn = null;

    // Retorna o resultado como JSON
    header("Content-Type: application/json");
    echo json_encode($result);
} catch (PDOException $e) {
    echo "Erro na conexão com o banco de dados: " . $e->getMessage();
}
?>
