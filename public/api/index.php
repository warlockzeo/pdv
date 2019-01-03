<?php 
    include("ClassClientes.php");
    $clientes=new ClassClientes();

    if($_GET['opcao']=='exibir'){
        $clientes->exibeClientes();
    } elseif($_GET['opcao']=='delete') {
        $clientes->deleteCliente($_GET['id']);
    }

    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
?>