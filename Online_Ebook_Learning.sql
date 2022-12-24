-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 24, 2022 at 11:44 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Online_Ebook_Learning`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `author` varchar(50) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `about` varchar(255) DEFAULT NULL,
  `teacher_id` int(11) NOT NULL,
  `isApproved` tinyint(1) DEFAULT NULL,
  `path` varchar(255) NOT NULL DEFAULT '""'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `author`, `img`, `about`, `teacher_id`, `isApproved`, `path`) VALUES
(1, 'Laws of Success', 'Napolean Hill', 'lawsuccess.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed arcu eu odio dapibus faucibus. Nulla mollis varius risus eu semper. Aliquam turpis felis, feugiat vel neque vel, posuere luctus turpis.', 1, 1, '\"\"'),
(2, 'Never Split the Difference', 'Chris Voss', 'neversplit.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed arcu eu odio dapibus faucibus. Nulla mollis varius risus eu semper. Aliquam turpis felis, feugiat vel neque vel, posuere luctus turpis.', 1, 1, 'Never Split the Difference_ Negotiating As If Your Life Depended On It ( PDFDrive ).pdf'),
(3, 'THE Art OF Manipulation', 'R. B. Sparkman', 'artmani.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed arcu eu odio dapibus faucibus. Nulla mollis varius risus eu semper. Aliquam turpis felis, feugiat vel neque vel, posuere luctus turpis.', 2, 1, 'The art of manipulation_ how to get what you want out of people in business, in your personal life, and in your love life ( PDFDrive ).pdf'),
(4, 'Resting Happiness', 'Matthew Kelly', 'resting happiness.jpg', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, ', 4, 1, 'RH_StudyGuide_V2.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `borrowing_status`
--

CREATE TABLE `borrowing_status` (
  `student_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `borrowing_status`
--

INSERT INTO `borrowing_status` (`student_id`, `book_id`, `status`) VALUES
(1, 2, 1),
(2, 2, 1),
(2, 1, 1),
(7, 1, 1),
(1, 1, 1),
(8, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('9QwftcfSlTvIDZQOKbOKn5IZCwuOBBXN', 1671964956, '{\"cookie\":{\"originalMaxAge\":86399994,\"expires\":\"2022-12-25T10:42:36.052Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"student\":{},\"teacher\":{},\"admin\":{\"user\":\"root\"}}'),
('e9TbAINbbxTERfEcWB0KmlNPm73lptDF', 1669709676, '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2022-11-29T08:14:36.474Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"teacher\":{},\"admin\":{\"user\":\"root\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `password`) VALUES
(1, 'Sparsh', 'test@test', '$2a$10$ASHxQox93RfgAyVMbfflOObSLlhtVWxcvzyxdZkrS5D4vxSYaRf2G'),
(2, 'LOREM IPSUM', '123@123', '$2a$10$GkfFQ7YRhAPiZMhBePmcY.DPeW7.34o1//p3UoUVAM6.9ML2V2ob2'),
(7, 'LOREM IPSUM 2', 'test1@test', '$2a$10$7KSLS2LcuqomaI8dES4XY.paci48pM8UzY6ISTU2CmW85dOOc0w7G');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `dept` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id`, `name`, `dept`, `email`, `password`) VALUES
(1, 'Teacher 1', 'Dept 1', 'teach1@teach', '$2a$10$qZMDSN.3kV63UmDwR5Qbu.mvDW1EIOBfiCaNb0tl21c9ySSDVQFem'),
(2, 'Teacher 2', 'Dept 2', 'teach2@teach', '$2a$10$rdfZT2xl7Ipg4zsczREU3e.aHm.EjBO8RrOJLb4hQaZ3DwOVCGjXu'),
(3, 'Teacher 3', 'Dept 1', 'teach3@teach', '$2a$10$kAm9DiQM7.dRQUhKZy5JVuXFCjHtiG.92q63pFWfuz9izIAQVVCF.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`email`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
