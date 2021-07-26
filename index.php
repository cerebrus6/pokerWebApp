<!DOCTYPE html>
<html>
<head>
	<title>Poker</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<div id="main">
	<div id="communityCards"></div>
	<div id="playerCards"></div>
</div>
<div></div>
<?php
	$server = "localhost";
	$database = "poker";
	$user = "root";
	$password = "";
	$conn = new mysqli($server, $user, $password, $database);
	if($conn->connect_error)
		die("<br />Fail ".$conn->connect_error());


	// $sql = "CREATE TABLE chips (
	// 		ID INT NOT NULL,
	// 		amount INT,
	// 		PRIMARY KEY (ID)
	// 		);";
	//	$sql = "INSERT INTO chips (amount) VALUES (1000)";

	// $sql = "SELECT  FROM"
	// function console_log($output, $with_script_tags=true) {
	// 	$js_code = 'console.log('.json_encode($output, JSON_HEX_TAG).');';
	// 	if($with_script_tags)
	// 		$js_code = '<script>'.$js_code.'</script>';
	// 	echo $js_code;
	// }

// if($conn->query($sql)==TRUE) {
// 	echo "<br />Successful";
// 		console_log("Successful");
// } else {
// 	echo "<br />Unsuccessful - ". $sql . "<br />" . $conn->error;
// 		console_log("<br />Unsuccessful - ". $sql . "<br />" . $conn->error);
// }
// // mysqli_close($conn);
// $conn->close();

?>

<script src="jquery-2.2.4.min.js" charset="utf-8"></script>
<script src="card.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>