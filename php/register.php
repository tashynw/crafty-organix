<?php
    include "./db_conn.php";

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    $fullname = trim($input['fullname']);
    $email = trim($input['email']);
    $password = trim($input['password']);

    if($query = $conn->prepare("SELECT * FROM users WHERE email = ?")) {
        $error = '';
        // Bind parameters (s = string, i = int, b = blob, etc), in our case the username is a string so we use "s"
        $query->bind_param('s', $email);
        $query->execute();
        // Store the result so we can check if the account exists in the database.
        $query->store_result();
            if ($query->num_rows > 0) {
                http_response_code(400);
                exit;
                //$error .= '<p class="error">The email address is already registered!</p>';
            } else {
                if (empty($error)) {
                    $insertQuery = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?);");
                    $insertQuery->bind_param("sss", $fullname, $email, $password);
                    $result = $insertQuery->execute();
                    if ($result) {
                        http_response_code(200);
                        exit;
                        //$error .= '<p class="success">Your registration was successful!</p>';
                    } else {
                        http_response_code(400);
                        exit;
                        $error .= '<p class="error">Something went wrong!</p>';
                    }
                }
            }
    }
    $query->close();
    // Close DB connection
    mysqli_close($conn);
?>
