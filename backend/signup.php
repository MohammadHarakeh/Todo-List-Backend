<?php
include ('connection.php');
// header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Content-Type");

$userName = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

$hashed_password = password_hash($password, PASSWORD_BCRYPT);


$check_email = $mysqli->prepare('SELECT  email FROM  users WHERE  email=?');
$check_email->bind_param('s',$email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();

$check_username = $mysqli->prepare('SELECT username FROM users WHERE username=?');
$check_username->bind_param('s',$userName);
$check_username->execute();
$check_username->store_result();
$username_exists = $check_username->num_rows();

if($email_exists == 0 && $username_exists == 0){
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $query = $mysqli->prepare('INSERT INTO users(username,password,email) VALUES(?,?,?)');
    $query->bind_param('sss', $userName, $hashed_password, $email);
    $query->execute();
    $response['status'] = "success";
    $response['message'] = "user $userName was created successfully";
} elseif ($username_exists > 0){
    $response["status"] = "error";
    $response["message"] = "Username already exists";
} 
elseif ($email_exists > 0) {
    $response["status"] = "error";
    $response["message"] = "Email already exists";
}
else {
    $response["status"] = "error";
    $response["message"] = "Incomplete data received";
}
echo json_encode($response);

?>