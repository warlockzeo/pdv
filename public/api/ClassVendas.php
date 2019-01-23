<?php 
    include("ClassConexao.php");

    class ClassVendas extends ClassConexao{

        #exibir Vendas com Json
        public function exibeVendas()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $datai = $obj['datai'];
            $dataf = (isset($obj['dataf'])) ? $obj['dataf'] : '';

            if(($datai !== null) and ($dataf==='')){
                $datas = 'WHERE dataVenda = "'.$datai.'"';
            } else if(($datai !== '') and ($dataf!=='')){
                $datas = 'WHERE dataVenda >= "'.$datai.'" AND dataVenda <= "'.$dataf.'"';
            } else {
                $datas = '';
            }
            
            $sql = "SELECT v.*, c.nome FROM vendas as v LEFT JOIN clientes as c ON v.idCliente = c.id $datas ORDER BY dataVenda ASC ";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "idCliente"=>$Fetch['idCliente'],
                    "nomeCliente"=>$Fetch['nome'],
                    "total"=>$Fetch['total'],
                    "desconto"=>$Fetch['desconto'],
                    "totalAPagar"=>$Fetch['totalAPagar'],
                    "pago"=>$Fetch['pago'],
                    "formaPg"=>$Fetch['formaPg'],
                    "resta"=>$Fetch['resta'],
                    "dataVenda"=>$Fetch['dataVenda'],
                    "operacao"=>$Fetch['operacao'],
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
            //echo $sql;
        }

        public function gravaVenda()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $idCliente = $obj['cliente'];
            $total = (isset($obj['total'])) ? $obj['total'] : '0.00';
            $desconto = (isset($obj['desconto'])) ? $obj['desconto'] : '0.00';
            $totalAPagar = (isset($obj['totalAPagar'])) ? $obj['totalAPagar'] : '0.00';
            $pago = (isset($obj['pago'])) ? $obj['pago'] : '0.00';
            $formaPg = $obj['formaPg'];
            $resta = (isset($obj['resta'])) ? $obj['resta'] : '0.00';
            $operacao = $obj['operacao'];

            $dataVenda = date('Y/m/d');

            $sql = "INSERT INTO vendas (idCliente, total, desconto, totalAPagar, pago, formaPg, resta, dataVenda, operacao) VALUES ('$idCliente', '$total', '$desconto', '$totalAPagar', '$pago', '$formaPg', '$resta', '$dataVenda', '$operacao')";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $sql2 = "SELECT id FROM vendas ORDER BY id DESC LIMIT 1";
            $BFetch=$this->conectaDB()->prepare($sql2);
            $BFetch->execute();
            $venda = $BFetch->fetch( PDO::FETCH_ASSOC );
            $BFetch->closeCursor();
            
            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'", "id":"'.$venda['id'].'"}';
        }

        #exibir Vendas de um determinado cliente com Json
        public function historico($cliente)
        {
            $BFetch=$this->conectaDB()->prepare("SELECT * FROM vendas WHERE idCliente = $cliente ORDER BY dataVenda DESC");
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "idCliente"=>$Fetch['idCliente'],
                    "total"=>$Fetch['total'],
                    "desconto"=>$Fetch['desconto'],
                    "totalAPagar"=>$Fetch['totalAPagar'],
                    "pago"=>$Fetch['pago'],
                    "formaPg"=>$Fetch['formaPg'],
                    "resta"=>$Fetch['resta'],
                    "dataVenda"=>$Fetch['dataVenda'],
                    "valor"=>$Fetch['resta'],
                    "operacao"=>$Fetch['operacao']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

    }
    
?>