<?php
require_once __DIR__."/..//Model/DbConnect.php";
class Operation extends DbConnect{

public function getUsers($id)
{
    $query=$this->connect()->prepare("SELECT * FROM `users` WHERE `users`.`IdUser` = '$id'");
    if($query->execute()){
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }else{
        return 0;
    }
}
//registration 
public function Register($idUser,$name,$lname,$age,$birth)
{
     $query =$this->connect()->prepare("INSERT INTO `users`(`IdUser`, `Name`, `Lname`, `Age`, `Birth`) VALUES ('$idUser','$name','$lname','$age','$birth')");
     if($query->execute())
        return true;
        return false;
}


}