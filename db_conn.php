<?php

    $host = "localhost";
    $username = "root";
    $password = "";
    $db_name = #enter db name here;

    $conn = mysqli_connect($host, $username, $password, $db_name);

    if(!$conn){
        echo "Connection Failed";
    }
    ?>