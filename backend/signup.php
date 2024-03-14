<?php
include ('connection.php');
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$userName = isset($_POST['username']) ? $_POST['username'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

$hashed_password = password_hash($password, PASSWORD_BCRYPT);


$check_user = $mysqli->prepare('SELECT  username, email FROM  users WHERE username=? OR email=?');
$check_user->bind_param('ss', $username, $email);
$check_user->execute();
$check_user->store_result();
$user_exists = $check_user->num_rows();



if($user_exists > 0){

    $response["status"] = "error";
    $response["message"] = "Username or email already exists";

}
else {
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $query = $mysqli->prepare('INSERT INTO users(username,password,email) VALUES(?,?,?)');
    $query->bind_param('sss', $userName, $hashed_password, $email);
    $query->execute();
    
    $response['status'] = "success";
    $response['message'] = "user $userName was created successfully";
}

echo json_encode($response);

?>
