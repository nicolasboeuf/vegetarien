<?php 
	$to = $_POST["usermail"];
	echo $_POST["messageTXT"];
	$headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
	$headers .= 'From: Générateur de listes de courses végétariennes <vegetarien@nicolasboeuf.fr>' . "\n";

	$subject = "Votre liste de courses végétariennes";
	
	echo mail($to, $subject, $_POST["messageTXT"], $headers);
?>