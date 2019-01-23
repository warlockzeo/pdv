<?php
$caminhoDoMysqldump = "D:\wamp64\bin\mysql\mysql5.7.23\bin\mysqldump.exe";
$usuario = "warlock";
$senha = "smtqgjh";
$banco = "pdv";
$saida = "D:\wamp64\www\\react\pdv\build\api\backup\backup.sql"; // por exemplo

// Gera o backup e salva em disco
//echo ("$caminhoDoMysqldump --user=$usuario --password=$senha $banco > $saida");
exec("$caminhoDoMysqldump --user=$usuario --password=$senha $banco > $saida");

// Redireciona o browser para o arquivo gerado
header('Location: /api/backup/backup.sql');
exit;

?>