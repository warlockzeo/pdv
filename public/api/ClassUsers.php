<?php
include("ClassConexao.php");

class ClassUsers extends ClassConexao
{

    #exibir Users com Json
    public function fazerLogin()
    {
        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");

        $json = file_get_contents('php://input');
        $obj = json_decode($json, TRUE);
        $login = $obj['login'];
        $password = $obj['password'];

        $BFetch = $this->conectaDB()->prepare("SELECT * FROM users WHERE login = '$login' AND password = '$password'");
        $BFetch->execute();
        $num = $BFetch->rowCount();

        if ($num > 0) {

            echo json_encode(["message" => "ok"]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "error"]);
        }
    }
}
