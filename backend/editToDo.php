<?php
include("connection.php");



$task_id = isset($_POST['id']) ? $_POST['id'] : '';
$task = isset($_POST['task']) ? $_POST['task'] : '';
$checkTask = isset($_POST['check_task']) ? $_POST['check_task'] : '';

$query = $mysqli->prepare("select * from todo where id = ?");
$query->bind_param("i", $task_id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if($num_rows == 0){
  $response['status'] = "Failed to edit task";
  $response['message'] = "Task not found";
}else{
  $edit_todo = $mysqli->prepare("update todo set task = ?, checkTask = ?  where id = ?");
  $edit_todo->bind_param("sii",$task, $checkTask, $task_id);
  $edit_todo->execute();

  $response['status'] = 'Success';
  $response['message'] = "task edited successfully";
}

echo json_encode($response);