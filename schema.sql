DROP DATABASE IF EXISTS crafty_organix;
CREATE DATABASE crafty_organix;
USE crafty_organix;

-- Table structure for `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(35) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` varchar(40) NOT NULL,
  `imagelocation` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
)

DROP TABLE IF EXISTS `paymentproofs`;
CREATE TABLE `paymentproofs` (
  `id` int(11) NOT NULL auto_increment,
  `cart` varchar(255) NOT NULL,
  `buyeremail` varchar(50) NOT NULL,
  `imagelocation` varchar(255) NOT NULL,
  `proofstatus` varchar(255) NOT NULL,
  `deliveryinfo` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
)