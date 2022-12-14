<?php
    include "./db_conn.php";

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    $cart = trim($input['cart']);
    $buyeremail = trim($input['buyeremail']);
    $imageLocation = trim($input['imageLocation']);
    $proofstatus = trim($input['proofstatus']);
    $deliveryinfo = trim($input['deliveryinfo']);

    $insertQuery = $conn->prepare("INSERT INTO paymentproofs (cart, buyeremail, imagelocation, proofstatus, deliveryinfo) VALUES (?, ?, ?, ?, ?);");
    $insertQuery->bind_param("sssss", $cart, $buyeremail, $imageLocation, $proofstatus, $deliveryinfo);
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