DROP DATABASE IF EXISTS crafty_organix;
CREATE DATABASE crafty_organix;
USE crafty_organix;

/* TABLE STRUCTURE */

DROP TABLE IF EXISTS `users`;
CREATE TABLE users (
    `UserId` varchar(255) NOT NULL,
    `FirstName` varchar(255) NOT NULL,
    `LastName` varchar(255) NOT NULL,
    `EmailAddress` varchar(255) NOT NULL,
    `UserPassword` varchar(255) NOT NULL,
    `Role` varchar(255) NOT NULL,
    PRIMARY KEY  (`UserId`)
)

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `ProductId` varchar(255) NOT NULL,
  `Name` varchar(35) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Price` varchar(40) NOT NULL,
  PRIMARY KEY  (`ProductId`)
)
