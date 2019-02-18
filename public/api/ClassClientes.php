<?php 
    include("ClassConexao.php");

    class ClassClientes extends ClassConexao{

        #exibir clientes com Json
        public function exibeClientes()
        {
            $BFetch=$this->conectaDB()->prepare("SELECT * FROM clientes ORDER BY nome ASC");
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
                    "saldo"=>$Fetch['saldo'],
                    "dataSaldo"=>$Fetch['dataSaldo'],
                    "complemento"=>$Fetch['complemento']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        #exibir clientes devedores com Json
        public function exibeDevedores()
        {
            $BFetch=$this->conectaDB()->prepare("SELECT * FROM clientes WHERE saldo > 0 ORDER BY nome ASC");
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
                    "saldo"=>$Fetch['saldo'],
                    "dataSaldo"=>$Fetch['dataSaldo'],
                    "complemento"=>$Fetch['complemento']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        public function exibeCliente($id)
        {
            $BFetch=$this->conectaDB()->prepare("SELECT * FROM clientes WHERE id = $id");
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
                    "saldo"=>$Fetch['saldo'],
                    "dataSaldo"=>$Fetch['dataSaldo'],
                    "complemento"=>$Fetch['complemento']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        public function apagaCliente($id)
        {
            $BFetch=$this->conectaDB()->prepare("DELETE FROM clientes WHERE id=$id");
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo '{"resp":"ok"}';
        }

        public function gravaCliente()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $nome = $obj['nome'];
            $endereco = $obj['endereco'];
            $cpf = $obj['cpf'];
            $rg = $obj['rg'];
            $fone = $obj['fone'];
            $saldo = $obj['saldo'];
            $dataSaldo = $obj['dataSaldo'];
            $complemento = $obj['complemento'];

            $sql = "INSERT INTO clientes (nome, endereco, fone, cpf, rg, dataSaldo, saldo, complemento) VALUES ('$nome', '$endereco', '$fone', '$cpf', '$rg', '$dataSaldo', '$saldo', '$complemento')";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

        public function atualizaCliente()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $id = $obj['id'];
            if($id){
                $nome = $obj['nome'];
                $endereco = $obj['endereco'];
                $cpf = $obj['cpf'];
                $rg = $obj['rg'];
                $fone = $obj['fone'];
                $saldo = $obj['saldo'];
                $dataSaldo = $obj['dataSaldo'];
                $complemento = $obj['complemento'];

                $sql = "UPDATE clientes SET nome = '$nome', endereco = '$endereco', fone = '$fone', cpf = '$cpf', rg = '$rg', saldo = '$saldo', dataSaldo='$dataSaldo', complemento='$complemento' WHERE id = $id";
                $BFetch=$this->conectaDB()->prepare($sql);
                $BFetch->execute();
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

        public function atualizaSaldo()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $id = $obj['id'];
            if($id){
                $saldo = $obj['saldo'];
                $dataSaldo = date('Y/m/d');
    
                $sql = "UPDATE clientes SET saldo = saldo + $saldo, dataSaldo = '$dataSaldo' WHERE id = $id";
                $BFetch=$this->conectaDB()->prepare($sql);
                $BFetch->execute();
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

    }
    
?>