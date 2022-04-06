<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
include '../vendor/autoload.php';
header('Access-Control-Allow-Origin:*'); // * OR https://www.reddit.com/

header('Content-Type: application/json ; charset=utf-8');
//  header('Content-Type: multipart/form-data'); // ** FormData, for image uploading
header("Access-Control-Allow-Methods: *"); // TODO: POST,GET,DELETE,PUT
header("Access-Control-Max-Age: 600");
header("Access-Control-Allow-Headers:*");
require __DIR__."/../Model/Operation.php";



//Creating a class
class RendezController{

  public function __construct()
  {
    $operation = new Operation();
    $operation->autoInsertAppointements();
  }
    

public function getUser(){
  $operation = new Operation();
  $idUser=json_decode(file_get_contents("php://input"));
  $json = json_encode($operation->getUsers($idUser->id));
  echo $json;
}
public function getAppointements()
{
     $operation = new Operation();
     $appointements = json_encode($operation->getAppointements());
     echo $appointements;
}

//regester Methode 
public function singUp()
{
  $operation = new Operation();

  $idUser=json_decode(file_get_contents("php://input")); 
  $name = json_decode(file_get_contents("php://input"));  
  $lname = json_decode(file_get_contents("php://input")); 
  $age = json_decode(file_get_contents("php://input")); 
  $birth = json_decode(file_get_contents("php://input")); 

  if($operation->Register($idUser->id,$name->name,$lname->lname,$age->age,$birth->birth)){
            http_response_code(200);
            echo  json_encode(array("message" => "Account Created Succesfully"));
            }
            else {
            http_response_code(400);
            echo json_encode(array("message" => "Something Went Wrong, Please Try Again"));}
}

//validate JWT token
public function validateToken()
{
 
// $data = json_decode(file_get_contents("php://input"));
 $all_headers = getallheaders();
$jwtToken = $all_headers['Authorization'];

// $jwt=isset($data->jwt) ? $data->jwt : "";
 $key = "akrate1999";

if(!empty($jwtToken)){
    try {
      
        $tokendecode=JWT::decode($jwtToken,new key ($key,'HS512'));
       http_response_code(200);
        echo json_encode(array(
            "message" => "Access granted.",
            "data" => $tokendecode->data
        ));
 
    }
catch (Exception $e){
   http_response_code(401);
    echo json_encode(array(
        "message" => "Access denied.",
        "error" => $e->getMessage(),
        
    ));
}
}

else{
 
    http_response_code(401);
    echo json_encode(array("message" => "Access denied."));
}

}
















 public function login()
 {

     $operation = new Operation();
     $idUser=json_decode(file_get_contents("php://input"));
     $json = $operation->getUsers($idUser->id);
     $issuedAt   = new DateTimeImmutable();

     foreach($json as $j)
     {
       $id = $j['IdUser'];
       $name =$j['Name'];
       $lname=$j['Lname'];
       $age=$j['Age'];
       $birth=$j['Birth'];
       $payload=[
         'iss'=>'localhost',
         'and'=>'localhost',
         'exp'=>$issuedAt->modify('+60 minutes')->getTimestamp(),
         'data' =>[
           'IdUser'=>$idUser,
           'Name' => $name,
           'Lname' =>$lname,
         ],
        ];
        $secret_Key="akrate1999";
       $jwt=JWT::encode($payload,$secret_Key,'HS512');
          echo json_encode([
     'status' => 1,
     'jwt'=>$jwt,
     'message' => 'Login Successfully',
     'expire' =>$payload['exp'],
     'IdUser' =>$id,
     'name' => $name,
     'lname' =>$lname
   ]);
     }
 }
}
?>