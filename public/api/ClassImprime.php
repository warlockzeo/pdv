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
            $cabecalho .= "------------------------------------------------\n";
            $cabecalho .= "               DejaVu Boutique \n";
            $cabecalho .= "------------------------------------------------\n";
            $cabecalho .= "Dayana Maria Santos 01299679471 \n";
            $cabecalho .= "Endereco Rua Vigario Tejo, 35A \n";
            $cabecalho .= "Centro - Taquaritinga do Norte - PE \n";
            $cabecalho .= "Cep: 55790-000 \n";
            $cabecalho .= "CNPJ: 28.522.790/0001-94 \n";
            $cabecalho .= "Fone: 99223-1394 / 99827-6186 \n";
            $cabecalho .= "\n";
            $cabecalho .= "------------------------------------------------\n";
            $cabecalho .= "                Cupom nao fiscal\n";
            $cabecalho .= "------------------------------------------------\n";
            $cabecalho .= "\n";

            $BFetch=$this->conectaDB()->prepare("SELECT nome FROM clientes WHERE id = $venda[cliente]");
            $BFetch->execute();
            $cliente = $BFetch->fetch( PDO::FETCH_ASSOC );
            
            if($cliente['nome']){$cliente = $cliente['nome'];} else {$cliente = "Nao Identificado";}

            $cabecalho .= "Consumidor: $cliente\n";
            $cabecalho .= "Data: ". date('d/m/Y')."\n";
            $cabecalho .= "\n";

            $itens =      "------------------------------------------------\n";
            $itens .=     "# | Descr               | QTD | VL UN | SUBTOTAL\n";
            $itens .=     "------------------------------------------------\n";

            $itensVendidos = $obj['itensVendidos'];

            $i = 1;
            foreach($itensVendidos as $item){
                $BFetch=$this->conectaDB()->prepare("SELECT descr FROM produtos WHERE id = $item[id]");
                $BFetch->execute();
                $produto = $BFetch->fetch( PDO::FETCH_ASSOC );

                if(strlen($produto['descr'])<=22){
                    $strEspaco = '';
                    for($espaco=strlen($produto['descr']);$espaco<=23;$espaco++){
                        $strEspaco .= ' ';
                    }
                    $descr = $produto['descr'] . $strEspaco;
                } else {
                    $descr = substr($produto['descr'],0,23);
                }

                $subTotal = number_format($item['subTotal'], 2);

                $itens .= "$i | $descr| $item[quant] | $item[unit] | $subTotal \n";
                $i++;
            }
            $itens .=     "\n";

            //cria espaços para ajustar a largura
            function criaEspaco($texto,$valor){
                $textoLen = strlen($texto);
                $valorLen = strlen($valor);
                if(($textoLen + $valorLen) <= 46){
                    $strEspaco = '';
                    for($espaco=0;($textoLen + $valorLen + $espaco)<=46;$espaco++){
                        $strEspaco .= ' ';
                    }
                }
                return $texto.$strEspaco.$valor;
            }

            $rodape =  "------------------------------------------------\n";
            $rodape .= criaespaco('Total',$venda['total'])." \n";
            $rodape .= criaespaco('Desconto',$venda['desconto'])." \n";
            $rodape .= criaespaco('Subtotal',$venda['totalAPagar'])." \n";
            $rodape .= criaespaco('Forma de Pagamento',$venda['formaPg'])." \n";
            $rodape .= criaespaco('Dinheiro',$venda['pago'])." \n";
            $rodape .= criaespaco('Resta',$venda['resta'])." \n";
            $rodape .= criaespaco('Troco',$venda['troco'])." \n";
            $rodape .= "------------------------------------------------\n";
            $rodape .= "\n";
            $rodape .= "\n";
            $rodape .= "\n";
            $rodape .= "\n"; //quebras de linha

            $rodape .= "\n".chr(27).chr(109); // finaliza a impessão e faz o corte


            $name = utf8_encode('cupomFiscal.txt');
            $text = $cabecalho . $itens . $rodape;
            $file = fopen($name, 'w');
            fwrite($file, $text);
            fclose($file);

            exec('imprime.bat');
  //          $output = shell_exec('print.bat');
  //          echo "<pre>$output</pre>";

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo '{"resp":"ok"}';

        }

    }
    
?>