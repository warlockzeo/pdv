<?php  

            $name = 'cupomFiscal.txt';
            $file = fopen($name, 'w');
            $conteudo = mb_convert_encoding('çãáúê','CP850');
            fwrite($file, $conteudo);
            fclose($file);
            echo $conteudo;
            $encode= mb_detect_encoding($conteudo);
            echo "enc-".$encode;

?>