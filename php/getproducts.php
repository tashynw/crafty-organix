<?php

include "./db_conn.php";

$sql = "SELECT * FROM products";

$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_all($result);
if(mysqli_num_rows($result) > 0) {
    http_response_code(200);
    echo json_encode($row);
    exit;
}
else{
    http_response_code(400);
    exit;
}