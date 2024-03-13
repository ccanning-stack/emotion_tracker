-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 11, 2024 at 04:50 PM
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

--
-- Dumping data for table `emotion`
--

INSERT INTO `emotion` (`emotion_id`, `name`, `description`) VALUES
(1, 'Anger', 'Anger is one of the seven universal emotions which arises when we are blocked from pursuing a goal and/or treated unfairly. At its most extreme, anger can be one of the most dangerous emotions because of its potential connection to violence and, therefore, is a common emotion to seek help in dealing with.'),
(2, 'Contempt', 'The least researched of the seven universal emotions, contempt is the feeling of dislike for and superiority (usually morally) over another person, group of people, and/or their actions. It has been accepted by many emotions experts to be a universal emotion, however, some emotions scientists still don’t distinguish contempt as a distinct emotion.\r\n \r\n \r\nDr. Ekman’s original list of universal emotions, discovered during his groundbreaking research in New Guinea in the 1960s, didn’t include contempt but he later added it after his continued cross-cultural research.'),
(3, 'Disgust', 'Disgust is one of the seven universal emotions and arises as a feeling of aversion towards something offensive. We can feel disgusted by something we perceive with our physical senses (sight, smell, touch, sound, taste), by the actions or appearances of people, and even by ideas.'),
(4, 'Enjoyment', 'Enjoyment is, for many, the most desirable of the seven universal emotions, typically arising from connection or sensory pleasure. The word happiness and enjoyment can be interchanged, although increasingly people use the word happiness to refer to their overall sense of well-being or evaluation of their lives rather than a particular enjoyment emotion.'),
(5, 'Fear', 'Fear is one of the seven universal emotions experienced by everyone around the world. Fear arises with the threat of harm, either physical, emotional, or psychological, real or imagined. While traditionally considered a “negative” emotion, fear actually serves an important role in keeping us safe as it mobilizes us to cope with potential danger.'),
(6, 'Sadness', 'Sadness is one of the seven universal emotions experienced by everyone around the world resulting from the loss of someone or something important. What causes us sadness varies greatly based on personal and cultural notions of loss. While sadness is often considered a “negative” emotion, it serves an important role in signaling a need to receive help or comfort.'),
(7, 'Surprise', 'Surprise is one of the seven universal emotions and arises when we encounter sudden and unexpected sounds or movements. As the briefest of the universal emotions, its function is to focus our attention on determining what is happening and whether or not it is dangerous.');

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

--
-- Dumping data for table `emotion_snapshot`
--

INSERT INTO `emotion_snapshot` (`emotion_snapshot_id`, `intensity`, `emotion_id`, `snapshot_id`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 3, 1),
(4, 8, 4, 1),
(5, 1, 5, 1),
(6, 1, 6, 1),
(7, 7, 7, 1),
(8, 4, 1, 2),
(9, 5, 2, 2),
(10, 7, 3, 2),
(11, 1, 4, 2),
(12, 1, 5, 2),
(13, 1, 6, 2),
(14, 4, 7, 2),
(15, 1, 1, 3),
(16, 1, 2, 3),
(17, 1, 3, 3),
(18, 10, 4, 3),
(19, 1, 5, 3),
(20, 2, 6, 3),
(21, 4, 7, 3),
(22, 1, 1, 4),
(23, 1, 2, 4),
(24, 1, 3, 4),
(25, 8, 4, 4),
(26, 2, 5, 4),
(27, 1, 6, 4),
(28, 7, 7, 4),
(29, 1, 1, 5),
(30, 1, 2, 5),
(31, 1, 3, 5),
(32, 7, 4, 5),
(33, 1, 5, 5),
(34, 2, 6, 5),
(35, 9, 7, 5),
(43, 1, 1, 7),
(44, 1, 2, 7),
(45, 1, 3, 7),
(46, 8, 4, 7),
(47, 1, 5, 7),
(48, 1, 6, 7),
(49, 1, 7, 7),
(50, 6, 1, 8),
(51, 4, 2, 8),
(52, 4, 3, 8),
(53, 2, 4, 8),
(54, 1, 5, 8),
(55, 3, 6, 8),
(56, 3, 7, 8),
(64, 1, 1, 10),
(65, 1, 2, 10),
(66, 1, 3, 10),
(67, 10, 4, 10),
(68, 1, 5, 10),
(69, 1, 6, 10),
(70, 1, 7, 10),
(71, 7, 1, 11),
(72, 7, 2, 11),
(73, 7, 3, 11),
(74, 9, 4, 11),
(75, 8, 5, 11),
(76, 8, 6, 11),
(77, 7, 7, 11),
(78, 1, 1, 12),
(79, 3, 2, 12),
(80, 1, 3, 12),
(81, 10, 4, 12),
(82, 1, 5, 12),
(83, 1, 6, 12),
(84, 1, 7, 12);

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

--
-- Dumping data for table `snapshot`
--

INSERT INTO `snapshot` (`snapshot_id`, `title`, `notes`, `datetime_created`, `user_id`) VALUES
(1, 'Good day! :)', '', '2024-03-05 13:10:01', 11),
(2, 'Bad day at the office', '', '2024-03-05 13:10:57', 11),
(3, 'Nice seeing friends again', '', '2024-03-05 13:11:47', 11),
(4, 'Football', '', '2024-03-05 13:13:15', 11),
(5, 'A day at the Museum', '', '2024-03-05 13:14:26', 11),
(7, 'Family dog walk!', '', '2024-03-05 13:17:35', 11),
(8, 'Stressful day at work', '', '2024-03-05 13:18:35', 11),
(10, 'Friday night in', 'New pizza place round the corner is sooo good!', '2024-03-05 13:21:20', 11),
(11, 'MY SECRET SNAPSHOT', '', '2024-03-05 14:16:02', 12),
(12, 'Great walk in Belmont', '', '2024-03-09 12:33:40', 11);

-- --------------------------------------------------------

--
-- Table structure for table `trigger_snapshot`
--

CREATE TABLE `trigger_snapshot` (
  `trigger_snapshot_id` int(11) NOT NULL,
  `trigger_id` int(11) NOT NULL,
  `snapshot_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trigger_snapshot`
--

INSERT INTO `trigger_snapshot` (`trigger_snapshot_id`, `trigger_id`, `snapshot_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 2),
(5, 5, 2),
(6, 6, 2),
(7, 7, 3),
(8, 8, 3),
(9, 9, 3),
(10, 10, 4),
(11, 11, 4),
(12, 12, 4),
(13, 13, 5),
(14, 14, 5),
(15, 15, 5),
(19, 19, 7),
(20, 20, 7),
(21, 21, 7),
(22, 22, 8),
(23, 23, 8),
(24, 24, 8),
(28, 28, 10),
(29, 29, 10),
(30, 30, 10),
(31, 31, 11),
(32, 32, 11),
(33, 33, 11),
(34, 34, 12),
(35, 35, 12),
(36, 36, 12);

-- --------------------------------------------------------

--
-- Table structure for table `trigger_table`
--

CREATE TABLE `trigger_table` (
  `trigger_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trigger_table`
--

INSERT INTO `trigger_table` (`trigger_id`, `name`) VALUES
(1, 'Dogs'),
(2, 'Wife'),
(3, 'Sunny'),
(4, 'Boss'),
(5, 'Team'),
(6, 'Stress'),
(7, 'Laughs'),
(8, 'Dinner'),
(9, 'Pints'),
(10, 'Real Madrid'),
(11, 'Football'),
(12, 'Bet'),
(13, 'Wife'),
(14, 'Art'),
(15, 'Sunny'),
(19, 'Dogs'),
(20, 'Wife'),
(21, 'Walk'),
(22, 'Work'),
(23, 'Stress'),
(24, 'New Project'),
(28, 'Pizza'),
(29, 'Netflix &amp; Chill'),
(30, 'Wife'),
(31, 'Real Madrid'),
(32, 'Wife'),
(33, 'Dogs'),
(34, 'Dogs'),
(35, 'Walk'),
(36, 'Family');

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
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `registration_date`, `birthdate`, `security_question_one`, `security_answer_one`, `security_question_two`, `security_answer_two`, `email`, `password`) VALUES
(11, 'Alejandro', 'Perez', '2024-03-11 14:36:14', '2000-02-29', 'Favourite colour', 'Red', 'Favourite Football Team', 'Real Madrid', 'aperez@hotmail.com', '$2b$13$cgwiSiU7a0x.T9EBwO/PPuR9WyNW7PIKAfCiEeDs5V8XqLF3z480.'),
(12, 'Christopher', 'Canning', '2024-03-05 14:14:18', '1987-01-23', 'Favourite Colour', 'Green', 'First School', 'Belfast Primary', 'halamadrid@hotmail.com', '$2b$13$s9CqRj8R1NrSqW4Ve.zi..yNeV4NPjZoHLTUBaKZYF7ZbP2sDrSnK');

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
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `emotion`
--
ALTER TABLE `emotion`
  MODIFY `emotion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `emotion_snapshot`
--
ALTER TABLE `emotion_snapshot`
  MODIFY `emotion_snapshot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT for table `snapshot`
--
ALTER TABLE `snapshot`
  MODIFY `snapshot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `trigger_snapshot`
--
ALTER TABLE `trigger_snapshot`
  MODIFY `trigger_snapshot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `trigger_table`
--
ALTER TABLE `trigger_table`
  MODIFY `trigger_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
