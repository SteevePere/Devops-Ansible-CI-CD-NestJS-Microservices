-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 22, 2020 at 08:39 AM
-- Server version: 5.7.19
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings_bkg`
--

DROP TABLE IF EXISTS `bookings_bkg`;
CREATE TABLE IF NOT EXISTS `bookings_bkg` (
  `BKG_ID` int(11) NOT NULL,
  `USR_ID` int(11) NOT NULL,
  `BKG_START_DATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `BKG_END_DATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`BKG_ID`),
  KEY `FK_BKG_USR` (`USR_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bookings_x_rooms_bxr`
--

DROP TABLE IF EXISTS `bookings_x_rooms_bxr`;
CREATE TABLE IF NOT EXISTS `bookings_x_rooms_bxr` (
  `BXR_ID` int(11) NOT NULL AUTO_INCREMENT,
  `BKG_ID` int(11) NOT NULL,
  `ROM_ID` int(11) NOT NULL,
  `BXR_OCCUPANCY` int(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`BXR_ID`),
  KEY `FK_BXR_BKG` (`BKG_ID`),
  KEY `Fk_BXR_ROM` (`ROM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bookings_x_services_bxs`
--

DROP TABLE IF EXISTS `bookings_x_services_bxs`;
CREATE TABLE IF NOT EXISTS `bookings_x_services_bxs` (
  `BXS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `BKG_ID` int(11) NOT NULL,
  `SVC_ID` int(11) NOT NULL,
  PRIMARY KEY (`BXS_ID`),
  KEY `FK_BXS_BKG` (`BKG_ID`),
  KEY `FK_BXS_SVC` (`SVC_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `hotels_htl`
--

DROP TABLE IF EXISTS `hotels_htl`;
CREATE TABLE IF NOT EXISTS `hotels_htl` (
  `HTL_ID` int(255) NOT NULL AUTO_INCREMENT,
  `HTL_ADDRESS` varchar(255) NOT NULL,
  `HTL_PHONE_NUMBER` varchar(15) NOT NULL,
  PRIMARY KEY (`HTL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rates_rte`
--

DROP TABLE IF EXISTS `rates_rte`;
CREATE TABLE IF NOT EXISTS `rates_rte` (
  `RTE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `RTE_AMOUNT` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`RTE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `roles_rle`
--

DROP TABLE IF EXISTS `roles_rle`;
CREATE TABLE IF NOT EXISTS `roles_rle` (
  `RLE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `RLE_NAME` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`RLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rooms_rom`
--

DROP TABLE IF EXISTS `rooms_rom`;
CREATE TABLE IF NOT EXISTS `rooms_rom` (
  `ROM_ID` int(11) NOT NULL AUTO_INCREMENT,
  `RMT_ID` int(11) NOT NULL,
  `HTL_ID` int(11) NOT NULL,
  `ROM_NAME` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`ROM_ID`),
  KEY `FK_ROM_RMT` (`RMT_ID`),
  KEY `FK_ROM_HTL` (`HTL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `roomtypes_rmt`
--

DROP TABLE IF EXISTS `roomtypes_rmt`;
CREATE TABLE IF NOT EXISTS `roomtypes_rmt` (
  `RMT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `RTE_ID` int(11) NOT NULL,
  `RMT_NAME` varchar(255) NOT NULL DEFAULT '',
  `RMT_MAX_OCCUPANCY` int(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`RMT_ID`),
  KEY `FK_RMT_RTE` (`RTE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `services_svc`
--

DROP TABLE IF EXISTS `services_svc`;
CREATE TABLE IF NOT EXISTS `services_svc` (
  `SVC_ID` int(11) NOT NULL AUTO_INCREMENT,
  `SVT_ID` int(11) NOT NULL,
  `HTL_ID` int(11) NOT NULL,
  PRIMARY KEY (`SVC_ID`),
  KEY `FK_SVC_SVT` (`SVT_ID`),
  KEY `FK_SVC_HTL` (`HTL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `servicetypes_svt`
--

DROP TABLE IF EXISTS `servicetypes_svt`;
CREATE TABLE IF NOT EXISTS `servicetypes_svt` (
  `SVT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `RTE_ID` int(11) NOT NULL,
  `SVT_NAME` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`SVT_ID`),
  KEY `FK_SVT_RTE` (`RTE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users_usr`
--

DROP TABLE IF EXISTS `users_usr`;
CREATE TABLE IF NOT EXISTS `users_usr` (
  `USR_ID` int(11) NOT NULL AUTO_INCREMENT,
  `RLE_ID` int(11) NOT NULL,
  `USR_EMAIL` varchar(255) NOT NULL DEFAULT '',
  `USR_PASSWORD` varchar(255) NOT NULL DEFAULT '',
  `USR_ACTIVE` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`USR_ID`),
  KEY `FK_USR_RLE` (`RLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings_bkg`
--
ALTER TABLE `bookings_bkg`
  ADD CONSTRAINT `FK_BKG_USR` FOREIGN KEY (`USR_ID`) REFERENCES `users_usr` (`USR_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bookings_x_rooms_bxr`
--
ALTER TABLE `bookings_x_rooms_bxr`
  ADD CONSTRAINT `FK_BXR_BKG` FOREIGN KEY (`BKG_ID`) REFERENCES `bookings_bkg` (`BKG_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `Fk_BXR_ROM` FOREIGN KEY (`ROM_ID`) REFERENCES `rooms_rom` (`ROM_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bookings_x_services_bxs`
--
ALTER TABLE `bookings_x_services_bxs`
  ADD CONSTRAINT `FK_BXS_BKG` FOREIGN KEY (`BKG_ID`) REFERENCES `bookings_bkg` (`BKG_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_BXS_SVC` FOREIGN KEY (`SVC_ID`) REFERENCES `services_svc` (`SVC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `rooms_rom`
--
ALTER TABLE `rooms_rom`
  ADD CONSTRAINT `FK_ROM_HTL` FOREIGN KEY (`HTL_ID`) REFERENCES `hotels_htl` (`HTL_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ROM_RMT` FOREIGN KEY (`RMT_ID`) REFERENCES `roomtypes_rmt` (`RMT_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `roomtypes_rmt`
--
ALTER TABLE `roomtypes_rmt`
  ADD CONSTRAINT `FK_RMT_RTE` FOREIGN KEY (`RTE_ID`) REFERENCES `rates_rte` (`RTE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `services_svc`
--
ALTER TABLE `services_svc`
  ADD CONSTRAINT `FK_SVC_HTL` FOREIGN KEY (`HTL_ID`) REFERENCES `hotels_htl` (`HTL_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_SVC_SVT` FOREIGN KEY (`SVT_ID`) REFERENCES `servicetypes_svt` (`SVT_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `servicetypes_svt`
--
ALTER TABLE `servicetypes_svt`
  ADD CONSTRAINT `FK_SVT_RTE` FOREIGN KEY (`RTE_ID`) REFERENCES `rates_rte` (`RTE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users_usr`
--
ALTER TABLE `users_usr`
  ADD CONSTRAINT `FK_USR_RLE` FOREIGN KEY (`RLE_ID`) REFERENCES `roles_rle` (`RLE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
