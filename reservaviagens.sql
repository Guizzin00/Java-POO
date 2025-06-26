CREATE DATABASE  IF NOT EXISTS `reservaviagens` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `reservaviagens`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: reservaviagens
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `destino`
--

DROP TABLE IF EXISTS `destino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destino` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cidade` varchar(100) NOT NULL,
  `pais` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destino`
--

LOCK TABLES `destino` WRITE;
/*!40000 ALTER TABLE `destino` DISABLE KEYS */;
INSERT INTO `destino` VALUES (1,'Distrito Federal','Brasil'),(2,'Acre','Brasil'),(3,'Alagoas','Brasil'),(4,'Amapá','Brasil'),(5,'Amazonas','Brasil'),(6,'Bahia','Brasil'),(7,'Ceará','Brasil'),(8,'Espírito Santo','Brasil'),(9,'Goiás','Brasil'),(10,'Maranhão','Brasil'),(11,'Mato Grosso','Brasil'),(12,'Minas Gerais','Brasil'),(13,'Mato Grosso do Sul','Brasil'),(14,'Pará','Brasil'),(15,'Paraíba','Brasil'),(16,'Pernambuco','Brasil'),(17,'Piauí','Brasil'),(18,'Rio de Janeiro','Brasil'),(19,'Rio Grande do Norte','Brasil'),(20,'Rio Grande do Sul','Brasil'),(21,'Rondônia','Brasil'),(22,'Roraima','Brasil'),(23,'Santa Catarina','Brasil'),(24,'São Paulo','Brasil'),(25,'Sergipe','Brasil'),(26,'Tocantins','Brasil'),(27,'Buenos Aires','Argentina'),(28,'Córdoba','Argentina'),(29,'Rosário','Argentina'),(30,'Nova York','Estados Unidos'),(31,'Los Angeles','Estados Unidos'),(32,'Chicago','Estados Unidos'),(33,'Lisboa','Portugal'),(34,'Porto','Portugal'),(35,'Coimbra','Portugal'),(36,'Tóquio','Japão'),(37,'Osaka','Japão'),(38,'Kyoto','Japão'),(39,'Paris','França'),(40,'Lyon','França'),(41,'Marselha','França'),(42,'Berlim','Alemanha'),(43,'Munique','Alemanha'),(44,'Hamburgo','Alemanha'),(45,'Londres','Reino Unido'),(46,'Manchester','Reino Unido'),(47,'Liverpool','Reino Unido'),(48,'Toronto','Canadá'),(49,'Vancouver','Canadá'),(50,'Montreal','Canadá'),(51,'Roma','Itália'),(52,'Milão','Itália'),(53,'Florença','Itália');
/*!40000 ALTER TABLE `destino` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `senha` text DEFAULT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'guilherme soares','guilherme.oriso@gmail.com','0000000','(61) 99198-6716');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viagem`
--

DROP TABLE IF EXISTS `viagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viagem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `passageiro_id` int(11) NOT NULL,
  `destino_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `passageiro_id` (`passageiro_id`),
  KEY `destino_id` (`destino_id`),
  CONSTRAINT `viagem_ibfk_1` FOREIGN KEY (`passageiro_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `viagem_ibfk_2` FOREIGN KEY (`destino_id`) REFERENCES `destino` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viagem`
--

LOCK TABLES `viagem` WRITE;
/*!40000 ALTER TABLE `viagem` DISABLE KEYS */;
INSERT INTO `viagem` VALUES (1,1,10);
/*!40000 ALTER TABLE `viagem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-25 23:59:25
