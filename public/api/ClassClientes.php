<?php 
    include("ClassConexao.php");

    class ClassClientes extends ClassConexao{

        #exibir clientes com Json
        public function exibeClientes()
        {
            $BFetch=$this->conectaDB()->prepare("SELECT * FROM clientes");
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "nome"=>$Fetch['nome'],
                    "endereco"=>$Fetch['endereco'],
                    "fone"=>$Fetch['fone'],
                    "cpf"=>$Fetch['cpf'],
                    "rg"=>$Fetch['rg'],
                    "saldo"=>$Fetch['saldo']
                ];
                $i++;
            }

            print_r($j);
            echo json_encode($j);
        }

        public function deleteCliente($id)
        {
            $BFetch=$this->conectaDB()->prepare("DELETE FROM clientes WHERE id=$id");
            $BFetch->execute();

            echo json_enconde(["resp"=>"ok"]);
        }

    }
    
?>