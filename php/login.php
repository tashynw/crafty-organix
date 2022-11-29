<?php
session_start();
include "./db_conn.php";

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
$email = trim($input['email']);
$password = trim($input['password']);

$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";

$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

if(mysqli_num_rows($result) === 1 && $row['email'] === $email && $row['password'] === $password) {
    http_response_code(200);
    exit;
}
else{
    http_response_code(400);
    exit;
}
