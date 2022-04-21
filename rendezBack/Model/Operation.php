<?php
require_once __DIR__."/..//Model/DbConnect.php";
class Operation extends DbConnect{


         //check if there is already inserted appointment in specifique day
public function ifAlreadyExist($date)
{
  $query = $this->connect()->prepare("SELECT COUNT(day) FROM `creneau` WHERE `day` = '$date';");
     if($query->execute()){
            return $query->fetch(PDO::FETCH_ASSOC);
        }else{
            return 0;
        }

}
        // this Method is for inserte an appointements everyday
public function autoInsertAppointements()
{
     $today = date("y-m-d");
     $count = $this->ifAlreadyExist($today);
    
    if($count["COUNT(day)"]==0)
    { 
       $appointements = array(
           "0"=>["8:00","8:30"],
           "1"=>["9:30","10:00"],
           "2"=>["10:00","10:30"],
           "3"=>["10:30","11:00"],
           "4"=>["11:00","11:30"],
           "5"=>["11:30","12:00"],
           "6"=>["14:00","14:30"],
           "7"=>["14:30","15:00"],
           "8"=>["15:30","16:00"],
           "9"=>["16:00","16:30"],
           "10"=>["16:30","17:00"],
           "11"=>["17:00","17:30"],
           "12"=>["17:30","18:00"],
        );


    foreach($appointements as $appointement)
    {
          $query=$this->connect()->prepare("INSERT INTO `creneau`(`startTime`,`endTime`,`day`) VALUES ('$appointement[0]','$appointement[1]','$today')");
       $query->execute();
    
    }}
}

//GET LIST OF APPOUNTEMETS 
public function getAppointements()
{
    $date = date("y-m-d");
    $query=$this->connect()->prepare('SELECT * FROM `creneau` WHERE `idCreanu` NOT IN (SELECT `idCreanu` FROM `appointement`) AND `day` = "'.$date.'" ');
    if($query->execute()){
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }else{
        return 0;
    }
}

public function getCreneau($id)
{
    $query = $this->connect()->prepare("SELECT * FROM `creneau` Where `idCreanu` = '$id'");
    if($query->execute())
    {
        return $query->fetch(PDO::FETCH_ASSOC);
    }
    else{
        return 0;
    }
}
//get reserved appointement 
public function reservedAppointement($id)
{
      $query = $this->connect()->prepare("SELECT appointement.idRDV,appointement.sujetRDV,creneau.startTime,creneau.endTime,creneau.day FROM `appointement` join `creneau` on appointement.idCreanu = creneau.idCreanu WHERE appointement.IdUser='$id';");
    if($query->execute())
    {
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }
    else{
        return 0;
    }
}
//Delete appointement
public function DeleteAppointement($id)
{
    $query = $this->connect()->prepare("DELETE FROM `appointement` WHERE `idRDV` = '$id'");
    if($query->execute())
    return true;
    return false;
}
//add an appointement
public function reserveAppointement($reason,$idUser,$idCreanu)
{
    $query=$this->connect()->prepare("INSERT INTO `appointement`(`sujetRDV`, `IdUser`, `idCreanu`) VALUES ('$reason','$idUser','$idCreanu')");
        if($query->execute())
           return true;
        return false;
}   
//


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