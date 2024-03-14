<?php
include('connection.php');

$user_id = $_POST['user_id'];
$task = $_POST['task'];
$checkTask = $_POST['check_task'];


$check_task_query = $mysqli->prepare('SELECT task FROM  todo WHERE user_id=? AND task=?');
$check_task_query->bind_param('is', $user_id, $task);
$check_task_query->execute();
$check_task_query->store_result();

if ($check_task_query->num_rows() > 0) {
    $response['status'] = "error";
    $response['message'] = "Task already exists for this user";
} else {
    $insert_task_query = $mysqli->prepare('INSERT INTO todo (user_id, task, check_task) VALUES (?, ?, ?)');
    $insert_task_query->bind_param('iss', $user_id, $task, $checkTask);
    
    if ($insert_task_query->execute()) {
        $response['status'] = "success";
        $response['message'] = "Task added successfully";
    } else {
        $response['status'] = "error";
        $response['message'] = "Error adding task";
    }
}

echo json_encode($response);