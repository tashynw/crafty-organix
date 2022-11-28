<?php

    $host = "localhost";
    $username = "root";
    $password = "";
    $db_name = "crafty_organix";

    $conn = mysqli_connect($host, $username, $password, $db_name);

    if(!$conn){
        echo "Connection Failed";
    }
    ?>