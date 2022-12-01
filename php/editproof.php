<?php
    include "./db_conn.php";

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    $productId = trim($input['productid']);
    $newstatus = trim($input['newstatus']);
    $insertQuery = $conn->prepare("UPDATE paymentproofs SET proofstatus=? WHERE id=?;");
    
    $insertQuery->bind_param("ss", $newstatus, $productId);
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
