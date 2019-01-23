<?php 
    if($_GET['tabela']=='clientes'){
        include("ClassClientes.php");

        $clientes=new ClassClientes();

        if($_GET['opcao']=='exibir'){
            $clientes->exibeClientes();
        } 

        if($_GET['opcao']=='exibe'){
            $clientes->exibeCliente();
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

        elseif($_GET['opcao']=='atualizaSaldo') {
            $clientes->atualizaSaldo();
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

        elseif($_GET['opcao']=='diminuiEstoque') {
            $produtos->diminuiEstoque();
        }

        elseif($_GET['opcao']=='adicionaEstoque') {
            $produtos->adicionaEstoque();
        }
    } else if($_GET['tabela']=='vendas'){
        include("ClassVendas.php");

        $vendas=new ClassVendas();

        if($_GET['opcao']=='exibir'){
            $vendas->exibeVendas();
        } 
        
        elseif($_GET['opcao']=='gravar') {
            $vendas->gravaVenda();    
        }

        elseif($_GET['opcao']=='historico') {
            $vendas->historico($_GET['id']);    
        }
        
    } else if($_GET['tabela']=='itensVendidos'){
        include("ClassItensVendidos.php");

        $itensVendidos=new ClassItensVendidos();

        if($_GET['opcao']=='exibirItensVendidos'){
            $itensVendidos->exibeItensVendidos($_GET['id']);
        } 
        
        elseif($_GET['opcao']=='gravarItensVendidos') {
            $itensVendidos->gravaItensVendidos();    
        }
    } else if($_GET['tabela']=='impressao'){
        include("ClassImprime.php");

        $imprime=new ClassImprime();

        if($_GET['opcao']=='imprimeCupom'){
            $imprime->imprimeCupom();
        } 
        
    } 



?>