<?php
    include "./db_conn.php";

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    $productName = trim($input['productName']);
    $description = trim($input['description']);
    $price = trim($input['price']);
    $imageLocation = trim($input['imageLocation']);


    $insertQuery = $conn->prepare("INSERT INTO products (name, description, price, imagelocation) VALUES (?, ?, ?, ?);");
    $insertQuery->bind_param("ssss", $productName, $description, $price, $imageLocation);
    $result = $insertQuery->execute();
    if ($result) {
        http_response_code(200);
        exit;
    } else {
        http_response_code(400);
        exit;
    }

    $query->close();
    // Close DB connection
    mysqli_close($conn);
?>
