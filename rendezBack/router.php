<?php

   
$variables = explode("/", $_GET['url']);
if (isset($variables[0])&&!empty($variables[0])) 
{
	$controller=ucfirst($variables[0])."Controller";
	if (file_exists("api/".$controller.".php")) 
	{
		require_once "api/".$controller.".php";
		$object=new $controller();
		if (isset($variables[1])&&!empty($variables[1])) 
		{
			$action=$variables[1];
			if(method_exists($object,$action))
			{
				if (isset($variables[2])&&!empty($variables[2])) 
				{
					$object->$action($variables[2]);
				}
				else
				{
					$object->$action();
				}
			}else
			{
				// require_once __DIR__."/Packages/Errors/Error404.php";
				exit();
			}
		}else
		{
			$action="index";
			$object->$action();
		}
	}else
	{
		// require_once __DIR__."/Packages/Errors/Error404.php";
	}
}
else{
	// require_once __DIR__."/view/index.php"; 
	// header("location:http://localhost/TripReservation/Booking/index");
}
