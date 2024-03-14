<?php
include('connection.php');

$email = $_POST['email'];
$username = $_POST['username'];
$password = $_POST['password'];

$query = $mysqli->prepare('select id,email,username,password from users where email=?');
$query->bind_param('s', $email);
$query->execute();
$query->store_result();
$query->bind_result($id,$email,$username,$hashed_password);
$query->fetch();
$num_rows = $query->num_rows();

if($num_rows == 0){
    $response['status'] = "user not found";
} else{
    if(password_verify($password,$hashed_password)){
        $response['status'] = "logged in";
        $response['user_id'] = $id;
        $response['username'] = $username;
        $response['email'] = $email;
    } else{
        $response['status'] = "incorrect credentials";
    }
}
echo json_encode($response);