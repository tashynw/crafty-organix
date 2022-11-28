DROP DATABASE IF EXISTS crafty_organix;
CREATE DATABASE crafty_organix;
USE crafty_organix;

-- Table structure for `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` int(11) NOT NULL auto_increment,
    `firstname` VARCHAR(250) NOT NULL default ' ',
    `lastname` VARCHAR(250) NOT NULL default ' ',
    `email` VARCHAR(50) NOT NULL default ' ',
    `password` VARCHAR(15) NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(35) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` varchar(40) NOT NULL,
  `imagelocation` varchar(40) NOT NULL,
  PRIMARY KEY  (`id`)
)


