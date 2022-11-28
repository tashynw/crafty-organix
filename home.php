<?php

session_start();

if (isset($_SESSION['email'])){
    ?>
    
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crafty Organix</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap" rel="stylesheet">
</head>
<body>
    
    <section id="header">
        <a href="#"><img src="img/Crafty Logo.png" class="logo"></a>

        <div>
            <ul id="navbar">
                <li><a href="index.html" class="active">Home</a></li>
                <li><a href="products.html">Products</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="cart.html">Shopping Cart</a></li>
            </ul>
        </div>
    </section>
    <section id="hero">
        <h4>Skin & Candles</h4>
        <h2>Crafty</h2>
        <h1>Organix</h1>
        <p>Crafting your curiosity</p>
        <button>Shop Now</button>
    </section>
    <script src="script.js"></script>
</body>
</html>

    <?php
}
else{
    header("Location: index.php");
    exit();
}
?>