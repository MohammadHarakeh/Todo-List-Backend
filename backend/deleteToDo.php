<?php
include('connection.php');

header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $task_id = isset($_POST['id']) ? $_POST['id'] : '';

    $delete_query = $mysqli->prepare('DELETE FROM todo WHERE id = ?');
    $delete_query->bind_param('i', $task_id);

    if ($delete_query->execute()) {
        $response['status'] = "success";
        $response['message'] = "Task deleted successfully";
    } else {
        $response['status'] = "error";
        $response['message'] = "Error deleting task";
    }

    echo json_encode($response);
} else {
    $response['status'] = "error";
    $response['message'] = "Invalid request method";
    echo json_encode($response);
}
?>
