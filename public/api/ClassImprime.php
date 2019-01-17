<?php 
    include("ClassConexao.php");

    class ClassImprime extends ClassConexao{

        #imprime cupom de venda
        public function imprimeCupom()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);

            $venda = $obj['venda'];

            $cabecalho = "\n";
            $cabecalho .= "DéjàVu Boutique \n";
            $cabecalho .= "Nome da empresa \n";
            $cabecalho .= "Endereço \n";
            $cabecalho .= "Centro - Taquaritinga do Norte - PE \n";
            $cabecalho .= "Cep: 55790-000 \n";
            $cabecalho .= "CNPJ: \n";
            $cabecalho .= "Fone:  \n";
            $cabecalho .= "\n";
            $cabecalho .= "----------------\n";
            $cabecalho .= "Cupom não fiscal\n";
            $cabecalho .= "----------------\n";
            $cabecalho .= "\n";

            $BFetch=$this->conectaDB()->prepare("SELECT nome FROM clientes WHERE id = $venda[cliente]");
            $BFetch->execute();
            $cliente = $BFetch->fetch( PDO::FETCH_ASSOC );
            
            $cabecalho .= "Consumidor: $cliente[nome]\n";
            $cabecalho .= "\n";

            $itens =     "----------------\n";
            $itens .=     "# | Descr | QTD | VL UN | SUBTOTAL\n";
            $itens .=     "----------------\n";

            $itensVendidos = $obj['itensVendidos'];
            
            //var_dump($itensVendidos);

            $i = 1;
            foreach($itensVendidos as $item){
                $BFetch=$this->conectaDB()->prepare("SELECT descr FROM produtos WHERE id = $item[id]");
                $BFetch->execute();
                $produto = $BFetch->fetch( PDO::FETCH_ASSOC );

                $itens .= "$i | $produto[descr] | $item[quant] | $item[unit] | $item[subTotal] \n";
                $i++;
            }
            $itens .=     "\n";


            $rodape = "----------------\n";
            $rodape .= "Total $venda[total] \n";
            $rodape .= "Desconto $venda[desconto] \n";
            $rodape .= "Subtotal $venda[totalAPagar] \n";
            $rodape .= "Forma de Pagamento $venda[formaPg] \n";
            $rodape .= "Dinheiro $venda[pago] \n";
            $rodape .= "Resta $venda[resta] \n";
            $rodape .= "----------------\n";



            $name = utf8_encode('cupomFiscal.txt');
            $text = $cabecalho . $itens . $rodape;
            $file = fopen($name, 'w');
            fwrite($file, $text);
            fclose($file);

            exec('print cupomFiscal.txt');

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo '{"resp":"ok"}';

        }

    }
    
?>