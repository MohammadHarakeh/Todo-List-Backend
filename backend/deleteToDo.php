<?php
include('connection.php');

header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the request contains the required data
    if (isset($_POST['id'])) {
        $task_id = $_POST['id'];

        // Perform the deletion
        $delete_query = $mysqli->prepare('DELETE FROM todo WHERE id = ?');
        $delete_query->bind_param('i', $task_id);

        if ($delete_query->execute()) {
            $response['status'] = "success";
            $response['message'] = "Task deleted successfully";
            $response['id'] = $task_id;
        } else {
            $response['status'] = "error";
            $response['message'] = "Error deleting task";
        }
    } else {
        $response['status'] = "error";
        $response['message'] = "Task ID not provided";
    }
} else {
    $response['status'] = "error";
    $response['message'] = "Invalid request method";
}

$select_query = $mysqli->query("SELECT id, task FROM todo");
$tasks = array();
while ($row = $select_query->fetch_assoc()) {
    // Append task data to $tasks array
    $tasks[] = array(
        'id' => $row['id'],
        'task' => $row['task']
    );
}

// Add tasks to the response
$response['tasks'] = $tasks;

echo json_encode($response);
?>
