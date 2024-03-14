<?php
include ('connection.php');

$userName = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

$hashed_password = password_hash($password, PASSWORD_BCRYPT);


$check_email = $mysqli->prepare('select email from users where email=?');
$check_email->bind_param('s',$email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();

$check_username = $mysqli->prepare('select username from users where username=?');
$check_username->bind_param('s',$userName);
$check_username->execute();
$check_username->store_result();
$username_exists = $check_username->num_rows();

if($email_exists == 0 && $username_exists == 0){
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $query = $mysqli->prepare('insert into users(username,password,email) values(?,?,?);');
    $query->bind_param('sss', $userName, $hashed_password, $email);
    $query->execute();
    $response['status'] = "success";
    $response['message'] = "user $userName was created successfully";
} else {
    $response["status"] = "user already exists";
    $response["message"] = "user $userName wasn't created";
}
echo json_encode($response);

?>