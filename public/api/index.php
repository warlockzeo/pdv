<?php 
    include("ClassClientes.php");
    $clientes=new ClassClientes();

    if($_GET['opcao']=='exibir'){
        $clientes->exibeClientes();

    } elseif($_GET['opcao']=='apagar') {
        $clientes->apagaCliente($_GET['id']);
        
    }
    elseif($_GET['opcao']=='gravar') {
        $clientes->gravaCliente($_GET['id']);
    }
?>