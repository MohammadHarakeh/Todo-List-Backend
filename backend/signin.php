<?php
include('connection.php');
header("Access-Control-Allow-Origin: *");

$email = isset($_POST['email']) ? $_POST['email'] : '';
$username = isset($_POST['username']) ? $_POST['username'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

$query = $mysqli->prepare('SELECT id, email, username AS user_name, password FROM users WHERE email = ? OR username = ?');
$query->bind_param('ss', $email, $username);
$query->execute();
$query->store_result();
$query->bind_result($id, $email, $username, $hashed_password);
$query->fetch();
$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = "user not found";
} else {
    if (password_verify($password, $hashed_password)) {
        $response['status'] = "logged in";
        $response['user_id'] = $id;
        $response['username'] = $username;
        $response['email'] = $email;

    } else {
        $response['status'] = "incorrect credentials";
    }
}
echo json_encode($response);

?>