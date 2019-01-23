<?php 
    include("ClassConexao.php");

    class ClassClientes extends ClassConexao{

        #exibir clientes com Json
        public function exibeClientes()
        {
            $BFetch=$this->conectaDB()->prepare("SELECT * FROM clientes ORDER BY saldo DESC, nome");
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
                    "saldo"=>$Fetch['saldo']
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

            $sql = "INSERT INTO clientes (nome, endereco, fone, cpf, rg, saldo) VALUES ('$nome', '$endereco', '$fone', '$cpf', '$rg', '$saldo')";
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
    
                $sql = "UPDATE clientes SET nome = '$nome', endereco = '$endereco', fone = '$fone', cpf = '$cpf', rg = '$rg', saldo = '$saldo' WHERE id = $id";
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
    
                $sql = "UPDATE clientes SET saldo = saldo + $saldo WHERE id = $id";
                $BFetch=$this->conectaDB()->prepare($sql);
                $BFetch->execute();
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

    }
    
?>