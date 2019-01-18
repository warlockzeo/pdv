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
            $cabecalho .= "--------------------------------------------------\n";
            $cabecalho .= "                 DéjàVu Boutique \n";
            $cabecalho .= "--------------------------------------------------\n";
            $cabecalho .= "Dayana Maria Santos 01299679471 \n";
            $cabecalho .= "Endereço Rua Vigário Tejo, 35A \n";
            $cabecalho .= "Centro - Taquaritinga do Norte - PE \n";
            $cabecalho .= "Cep: 55790-000 \n";
            $cabecalho .= "CNPJ: 28.522.790/0001-94 \n";
            $cabecalho .= "Fone: 99223-1394 / 99827-6186 \n";
            $cabecalho .= "\n";
            $cabecalho .= "--------------------------------------------------\n";
            $cabecalho .= "                Cupom não fiscal\n";
            $cabecalho .= "--------------------------------------------------\n";
            $cabecalho .= "\n";

            $BFetch=$this->conectaDB()->prepare("SELECT nome FROM clientes WHERE id = $venda[cliente]");
            $BFetch->execute();
            $cliente = $BFetch->fetch( PDO::FETCH_ASSOC );
            
            if($cliente['nome']){$cliente = $cliente['nome'];} else {$cliente = "Não Identificado";}

            $cabecalho .= "Consumidor: $cliente\n";
            $cabecalho .= "Data: ". date('d/m/Y')."\n";
            $cabecalho .= "\n";

            $itens =      "--------------------------------------------------\n";
            $itens .=     "# | Descr                 | QTD | VL UN | SUBTOTAL\n";
            $itens .=     "--------------------------------------------------\n";

            $itensVendidos = $obj['itensVendidos'];

            $i = 1;
            foreach($itensVendidos as $item){
                $BFetch=$this->conectaDB()->prepare("SELECT descr FROM produtos WHERE id = $item[id]");
                $BFetch->execute();
                $produto = $BFetch->fetch( PDO::FETCH_ASSOC );

                if(strlen($produto['descr'])<=26){
                    $strEspaco = '';
                    for($espaco=strlen($produto['descr']);$espaco<=26;$espaco++){
                        $strEspaco .= ' ';
                    }
                }

                $itens .= "$i | $produto[descr]$strEspaco| $item[quant] | $item[unit] | $item[subTotal] \n";
                $i++;
            }
            $itens .=     "\n";

            function criaEspaco($texto,$valor){
                $textoLen = strlen($texto);
                $valorLen = strlen($valor);
                if(($textoLen + $valorLen) <= 49){
                    $strEspaco = '';
                    for($espaco=0;($textoLen + $valorLen + $espaco)<=49;$espaco++){
                        $strEspaco .= ' ';
                    }
                }
                return $texto.$strEspaco.$valor;
            }

            $rodape =  "--------------------------------------------------\n";
            $rodape .= criaespaco('Total',$venda['total'])." \n";
            $rodape .= criaespaco('Desconto',$venda['desconto'])." \n";
            $rodape .= criaespaco('Subtotal',$venda['totalAPagar'])." \n";
            $rodape .= criaespaco('Forma de Pagamento',$venda['formaPg'])." \n";
            $rodape .= criaespaco('Dinheiro',$venda['pago'])." \n";
            $rodape .= criaespaco('Resta',$venda['resta'])." \n";
            $rodape .= "--------------------------------------------------\n";
            $rodape .= "\n";
            $rodape .= "\n";
            $rodape .= "\n";
            $rodape .= "\n";
            $rodape .= "\n";



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