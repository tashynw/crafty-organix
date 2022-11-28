<?php

session_start();

if (isset($_SESSION['email'])){
    ?>
    
    

    <?php
}
else{
    header("Location: index.php");
    exit();
}
?>