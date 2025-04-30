-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: polyrh
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `absences`
--

DROP TABLE IF EXISTS `absences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `absences` (
  `absence_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `absence_type` varchar(50) NOT NULL,
  PRIMARY KEY (`absence_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `absences_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absences`
--

LOCK TABLES `absences` WRITE;
/*!40000 ALTER TABLE `absences` DISABLE KEYS */;
INSERT INTO `absences` VALUES (1,1,'2023-01-10','2023-01-12','Sick Leave'),(2,2,'2023-02-05','2023-02-07','Vacation'),(3,3,'2023-02-15','2023-02-16','Sick Leave'),(4,4,'2023-03-01','2023-03-03','Training'),(5,5,'2023-03-10','2023-03-15','Maternity Leave'),(6,6,'2023-04-02','2023-04-02','Personal Day'),(7,7,'2023-04-20','2023-04-25','Sick Leave'),(8,8,'2023-05-10','2023-05-12','Bereavement'),(9,9,'2023-06-01','2023-06-30','Paternity Leave'),(10,10,'2023-06-15','2023-06-16','Vacation');
/*!40000 ALTER TABLE `absences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `department_id` int NOT NULL,
  `department_name` varchar(100) NOT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'HR'),(2,'Sales'),(3,'IT'),(4,'Finance'),(5,'Marketing');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Jean','Dupont','1985-03-15','2020-01-10',1,'HR Manager',55000.00),(2,'Marie','Martin','1990-07-22','2021-05-18',1,'HR Specialist',42000.00),(3,'Pierre','Bernard','1988-11-05','2019-11-03',2,'Sales Director',60000.00),(4,'Sophie','Petit','1992-02-28','2022-02-14',2,'Sales Associate',38000.00),(5,'Thomas','Durand','1983-09-12','2018-08-22',3,'IT Lead',65000.00),(6,'Laura','Leroy','1995-04-30','2023-01-05',3,'Developer',48000.00),(7,'Nicolas','Moreau','1987-12-10','2020-07-30',4,'Finance Analyst',52000.00),(8,'Emma','Lefebvre','1991-06-25','2021-09-12',4,'Accountant',45000.00),(9,'Luc','Roux','1989-08-17','2022-03-08',5,'Marketing Specialist',40000.00),(10,'Alice','Fournier','1994-01-20','2023-04-01',5,'Content Writer',35000.00),(11,'David','Girard','1993-05-14','2021-03-22',1,'HR Assistant',32000.00),(12,'Élodie','Sanchez','1988-11-30','2020-09-15',2,'Sales Manager',58000.00),(13,'Antoine','Lemoine','1991-07-18','2022-04-05',2,'Sales Representative',41000.00),(14,'Camille','Rousseau','1985-09-25','2019-06-10',3,'Senior Developer',62000.00),(15,'Hugo','Blanc','1994-02-11','2023-02-28',3,'IT Support',36000.00),(16,'Zoé','Garnier','1987-04-09','2021-11-08',4,'Financial Controller',55000.00),(17,'Mathis','Chevalier','1990-12-03','2022-07-17',4,'Payroll Specialist',43000.00),(18,'Léa','Baron','1992-08-21','2023-01-30',5,'Digital Marketing',39000.00),(19,'Romain','Noël','1986-03-27','2020-05-12',5,'Graphic Designer',42000.00),(20,'Chloé','Perrot','1995-10-08','2023-03-15',1,'Recruitment Officer',38000.00),(21,'Olivier','Marchand','1989-06-17','2021-08-09',1,'HR Business Partner',52000.00),(22,'Amandine','Dufour','1992-09-23','2023-02-14',2,'Account Executive',45000.00),(23,'Théo','Barbier','1994-04-05','2023-05-22',3,'Junior Developer',38000.00),(24,'Sarah','Leclercq','1984-12-19','2018-11-27',4,'Senior Accountant',58000.00),(25,'Maxime','Jacquet','1991-03-08','2022-01-31',5,'SEO Specialist',41000.00);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `email_user` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `motDePasse` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('admin','employe') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin soltani','admin@gmail.com','123456','admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-30 12:52:55
