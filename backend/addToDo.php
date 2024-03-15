<?php
include('connection.php');
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: POST, GET"); // Allow both POST and GET methods
header("Access-Control-Allow-Headers: Content-Type");

// Check if the request method is POST (for adding a new task)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = isset($_POST['user_id']) ? $_POST['user_id'] : '';
    $task = isset($_POST['task']) ? $_POST['task'] : '';
    $checkTask = isset($_POST['check_task']) ? $_POST['check_task'] : '';

    $check_task_query = $mysqli->prepare('SELECT task FROM todo WHERE user_id=? AND task=?');
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
} 
// If the request method is GET, fetch tasks for the specified user_id
else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header("Content-Type: application/json");

    // Check if user_id is provided in the request
    if (!isset($_GET['user_id'])) {
        $response = array(
            'status' => 'error',
            'message' => 'User ID is missing'
        );
        echo json_encode($response);
        exit;
    }

    $user_id = $_GET['user_id'];

    // Fetch tasks from the database for the given user_id
    $stmt = $mysqli->prepare("SELECT task FROM todo WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if tasks were fetched successfully
    if ($result->num_rows > 0) {
        $tasks = array();
        while ($row = $result->fetch_assoc()) {
            $tasks[] = $row['task'];
        }
        $response = array(
            'status' => 'success',
            'tasks' => $tasks
        );
    } else {
        $response = array(
            'status' => 'error',
            'message' => 'No tasks found for the user'
        );
    }

    echo json_encode($response);
}
