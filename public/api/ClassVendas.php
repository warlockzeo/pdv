<?php 
    include("ClassConexao.php");

    class ClassVendas extends ClassConexao{

        #exibir Vendas com Json
        public function exibeVendas()
        {
            $BFetch=$this->conectaDB()->prepare("SELECT * FROM vendas ORDER BY descr ASC");
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
                    "resta"=>$Fetch['resta']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        public function gravaVenda()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $idCliente = $obj['cliente'];
            $total = $obj['total'];
            $desconto = $obj['desconto'];
            $totalAPagar = $obj['totalAPagar'];
            $pago = $obj['pago'];
            $formaPg = $obj['formaPg'];
            $resta = $obj['resta'];

            $dataVenda = date('Y/m/d');

            $sql = "INSERT INTO vendas (idCliente, total, desconto, totalAPagar, pago, formaPg, resta, dataVenda) VALUES ('$idCliente', '$total', '$desconto', '$totalAPagar', '$pago', '$formaPg', '$resta', '$dataVenda')";
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

    }
    
?>