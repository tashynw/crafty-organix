<?php

require_once "db_conn.php";

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['submit'])) {

    $fullname = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirm_password = trim($_POST["confirm_password"]);

    if($query = $conn->prepare("SELECT * FROM users WHERE email = ?")) {
        $error = '';
        // Bind parameters (s = string, i = int, b = blob, etc), in our case the username is a string so we use "s"
	$query->bind_param('s', $email);
	$query->execute();
	// Store the result so we can check if the account exists in the database.
	$query->store_result();
        if ($query->num_rows > 0) {
            $error .= '<p class="error">The email address is already registered!</p>';
        } else {
            // Validate password
            if (strlen($password ) < 6) {
                $error .= '<p class="error">Password must have atleast 6 characters.</p>';
            }

            // Validate confirm password
            if (empty($confirm_password)) {
                $error .= '<p class="error">Please enter confirm password.</p>';
            } else {
                if (empty($error) && ($password != $confirm_password)) {
                    $error .= '<p class="error">Password did not match.</p>';
                }
            }
            if (empty($error) ) {
                $insertQuery = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?);");
                $insertQuery->bind_param("sss", $fullname, $email, $confirm_password);
                $result = $insertQuery->execute();
                if ($result) {
                    $error .= '<p class="success">Your registration was successful!</p>';
                } else {
                    $error .= '<p class="error">Something went wrong!</p>';
                }
            }
        }
    }
    $query->close();
    // Close DB connection
    mysqli_close($conn);
}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sign Up</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2>Register</h2>
                    <p>Please fill this form to create an account.</p>
                    <?php if(isset($error)){
                        echo $error;
                    } ?>
                    <form action="" method="post">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" name="name" class="form-control" required>
                        </div>    
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" name="email" class="form-control" required />
                        </div>    
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" name="password" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirm_password" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <input type="submit" name="submit" class="btn btn-primary" value="Submit">
                        </div>
                        <p>Already have an account? <a href="login.php">Login here</a>.</p>
                    </form>
                </div>
            </div>
        </div>    
    </body>
</html>