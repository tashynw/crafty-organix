<?php
    include "./db_conn.php";

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    $cart = trim($input['cart']);
    $buyeremail = trim($input['buyeremail']);
    $imageLocation = trim($input['imageLocation']);


    $insertQuery = $conn->prepare("INSERT INTO paymentproofs (cart, buyeremail, imagelocation) VALUES (?, ?, ?);");
    $insertQuery->bind_param("sss", $cart, $buyeremail, $imageLocation);
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