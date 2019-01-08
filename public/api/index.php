<?php 
    if($_GET['tabela']=='clientes'){
        include("ClassClientes.php");

        $clientes=new ClassClientes();

        if($_GET['opcao']=='exibir'){
            $clientes->exibeClientes();
        } 
        
        elseif($_GET['opcao']=='apagar') {
            $clientes->apagaCliente($_GET['id']);    
        }
    
        elseif($_GET['opcao']=='gravar') {
            $clientes->gravaCliente();
        }
    
        elseif($_GET['opcao']=='atualizar') {
            $clientes->atualizaCliente();
        }
    } else if($_GET['tabela']=='produtos'){
        include("ClassProdutos.php");

        $produtos=new ClassProdutos();

        if($_GET['opcao']=='exibir'){
            $produtos->exibeProdutos();
        } 
        
        elseif($_GET['opcao']=='apagar') {
            $produtos->apagaProduto($_GET['id']);    
        }
    
        elseif($_GET['opcao']=='gravar') {
            $produtos->gravaProduto();
        }
    
        elseif($_GET['opcao']=='atualizar') {
            $produtos->atualizaProduto();
        }
    }




?>