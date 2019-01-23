<?php 
    include("ClassConexao.php");

    class ClassItensVendidos extends ClassConexao{

        #exibir ItensVendidos com Json
        public function exibeItensVendidos($id)
        {
            $sql = "SELECT i.*,p.descr FROM itensVendidos as i LEFT JOIN produtos as p ON i.idProduto = p.id WHERE i.idVenda = $id";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "produto"=>$Fetch['descr'],
                    "quant"=>$Fetch['quant'],
                    "unit"=>$Fetch['unit'],
                    "subTotal"=>$Fetch['subTotal']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
            //echo $sql;
        }

        public function gravaItensVendidos()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $idVenda = $obj['idVenda'];
            $idProduto = $obj['idProduto'];
            $quant = $obj['quant'];
            $unit = $obj['unit'];
            $subTotal = $obj['subTotal'];

            $sql = "INSERT INTO itensVendidos (idVenda, idProduto, quant, unit, subTotal) VALUES ('$idVenda', '$idProduto', '$quant', '$unit', '$subTotal')";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();
            
            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

    }
    
?>