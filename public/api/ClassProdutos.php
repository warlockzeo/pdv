<?php 
    include("ClassConexao.php");

    class ClassProdutos extends ClassConexao{

        #exibir produtos com Json
        public function exibeProdutos()
        {
            $BFetch=$this->conectaDB()->prepare("SELECT * FROM produtos ORDER BY descr ASC");
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "codBarra"=>$Fetch['codBarra'],
                    "descr"=>$Fetch['descr'],
                    "preco"=>$Fetch['preco'],
                    "estoque"=>$Fetch['estoque']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        public function apagaProduto($id)
        {
            $BFetch=$this->conectaDB()->prepare("DELETE FROM produtos WHERE id=$id");
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo '{"resp":"ok"}';
        }

        public function gravaProduto()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $codBarra = $obj['codBarra'];
            $descr = $obj['descr'];
            $preco = $obj['preco'];
            $estoque = $obj['estoque'];

            $sql = "INSERT INTO produtos (codBarra, descr, preco, estoque) VALUES ('$codBarra', '$descr', '$preco', '$estoque')";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

        public function atualizaProduto()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $id = $obj['id'];
            if($id){
                $codBarra = $obj['codBarra'];
                $descr = $obj['descr'];
                $preco = $obj['preco'];
                $estoque = $obj['estoque'];
    
                $sql = "UPDATE produtos SET codBarra = '$codBarra', descr = '$descr', preco = '$preco', estoque = '$estoque' WHERE id = $id";
                $BFetch=$this->conectaDB()->prepare($sql);
                $BFetch->execute();
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

    }
    
?>