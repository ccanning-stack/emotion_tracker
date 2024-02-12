-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 10, 2024 at 01:44 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emotion_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `emotion`
--

CREATE TABLE `emotion` (
  `emotion_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `emotion_snapshot`
--

CREATE TABLE `emotion_snapshot` (
  `emotion_snapshot_id` int(11) NOT NULL,
  `intensity` int(2) NOT NULL,
  `emotion_id` int(11) NOT NULL,
  `snapshot_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `snapshot`
--

CREATE TABLE `snapshot` (
  `snapshot_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `notes` text NOT NULL,
  `datetime_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `trigger_snapshot`
--

CREATE TABLE `trigger_snapshot` (
  `trigger_snapshot_id` int(11) NOT NULL,
  `trigger_id` int(11) NOT NULL,
  `snapshot_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `trigger_table`
--

CREATE TABLE `trigger_table` (
  `trigger_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `registration_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `birthdate` date NOT NULL,
  `security_question_one` varchar(255) NOT NULL,
  `security_answer_one` varchar(255) NOT NULL,
  `security_question_two` varchar(255) NOT NULL,
  `security_answer_two` varchar(255) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varbinary(255) NOT NULL,
  `login_greeting` varchar(255) NOT NULL,
  `timezone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `emotion`
--
ALTER TABLE `emotion`
  ADD PRIMARY KEY (`emotion_id`);

--
-- Indexes for table `emotion_snapshot`
--
ALTER TABLE `emotion_snapshot`
  ADD PRIMARY KEY (`emotion_snapshot_id`),
  ADD KEY `FK_emotion_emotion_id` (`emotion_id`),
  ADD KEY `FK_snapshot_snapshot_id` (`snapshot_id`);

--
-- Indexes for table `snapshot`
--
ALTER TABLE `snapshot`
  ADD PRIMARY KEY (`snapshot_id`),
  ADD KEY `FK_user_user_id` (`user_id`);

--
-- Indexes for table `trigger_snapshot`
--
ALTER TABLE `trigger_snapshot`
  ADD PRIMARY KEY (`trigger_snapshot_id`),
  ADD KEY `FK_trigger_table_trigger_id` (`trigger_id`),
  ADD KEY `FK_snapshot_snapshot_id_two` (`snapshot_id`);

--
-- Indexes for table `trigger_table`
--
ALTER TABLE `trigger_table`
  ADD PRIMARY KEY (`trigger_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `emotion`
--
ALTER TABLE `emotion`
  MODIFY `emotion_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emotion_snapshot`
--
ALTER TABLE `emotion_snapshot`
  MODIFY `emotion_snapshot_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `snapshot`
--
ALTER TABLE `snapshot`
  MODIFY `snapshot_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trigger_snapshot`
--
ALTER TABLE `trigger_snapshot`
  MODIFY `trigger_snapshot_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trigger_table`
--
ALTER TABLE `trigger_table`
  MODIFY `trigger_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `emotion_snapshot`
--
ALTER TABLE `emotion_snapshot`
  ADD CONSTRAINT `FK_emotion_emotion_id` FOREIGN KEY (`emotion_id`) REFERENCES `emotion` (`emotion_id`),
  ADD CONSTRAINT `FK_snapshot_snapshot_id` FOREIGN KEY (`snapshot_id`) REFERENCES `snapshot` (`snapshot_id`);

--
-- Constraints for table `snapshot`
--
ALTER TABLE `snapshot`
  ADD CONSTRAINT `FK_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `trigger_snapshot`
--
ALTER TABLE `trigger_snapshot`
  ADD CONSTRAINT `FK_snapshot_snapshot_id_two` FOREIGN KEY (`snapshot_id`) REFERENCES `snapshot` (`snapshot_id`),
  ADD CONSTRAINT `FK_trigger_table_trigger_id` FOREIGN KEY (`trigger_id`) REFERENCES `trigger_table` (`trigger_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
