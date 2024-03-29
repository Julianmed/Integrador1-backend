-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: CONTROL_GASTOS
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `nombre_categoria` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (5,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Alimentacion','Alimentación personal');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concepto`
--

DROP TABLE IF EXISTS `concepto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `concepto` (
  `id_concepto` int NOT NULL AUTO_INCREMENT,
  `id_categoria` int NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `nombre_concepto` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_concepto`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concepto`
--

LOCK TABLES `concepto` WRITE;
/*!40000 ALTER TABLE `concepto` DISABLE KEYS */;
INSERT INTO `concepto` VALUES (1,1,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Concepto1','Hola'),(2,1,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Concepto2','Desc'),(3,1,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Casa','Arriendo'),(5,1,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Casa','Arriendo'),(6,1,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Carro','Transporte'),(7,3,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Cena navideña','Cena en familia para varias personas'),(8,5,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Cena','Concepto cena');
/*!40000 ALTER TABLE `concepto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimiento`
--

DROP TABLE IF EXISTS `movimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimiento` (
  `consecutivo` int NOT NULL AUTO_INCREMENT,
  `id_punto` int NOT NULL,
  `id_producto_servicio` int NOT NULL,
  `id_concepto` int NOT NULL,
  `id_categoria` int NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` int NOT NULL,
  `valor_unitario` decimal(10,2) NOT NULL,
  `tipo_movimiento` varchar(15) NOT NULL,
  PRIMARY KEY (`consecutivo`),
  CONSTRAINT `movimiento_chk_1` CHECK ((`tipo_movimiento` in (_utf8mb4'Adquirido',_utf8mb4'Estimado')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimiento`
--

LOCK TABLES `movimiento` WRITE;
/*!40000 ALTER TABLE `movimiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `movimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_servicio`
--

DROP TABLE IF EXISTS `producto_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_servicio` (
  `id_producto_servicio` int NOT NULL AUTO_INCREMENT,
  `id_concepto` int NOT NULL,
  `id_categoria` int NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `nombre_producto_servicio` varchar(100) NOT NULL,
  `unidad` varchar(20) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_producto_servicio`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_servicio`
--

LOCK TABLES `producto_servicio` WRITE;
/*!40000 ALTER TABLE `producto_servicio` DISABLE KEYS */;
INSERT INTO `producto_servicio` VALUES (4,1,1,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Salchicha','libra','Comida'),(5,1,1,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Pan','bolsa','Sanduches'),(6,7,3,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Pavo','kilo','Pavo en descuento'),(8,8,5,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Pollo','kilo',NULL);
/*!40000 ALTER TABLE `producto_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `punto_adquisicion`
--

DROP TABLE IF EXISTS `punto_adquisicion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `punto_adquisicion` (
  `id_punto` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `nombre_punto` varchar(100) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_punto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `punto_adquisicion`
--

LOCK TABLES `punto_adquisicion` WRITE;
/*!40000 ALTER TABLE `punto_adquisicion` DISABLE KEYS */;
INSERT INTO `punto_adquisicion` VALUES (2,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Exito Bello','Bello','Cercano al parque de bello'),(3,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Exito ','Envigado','Arriba de la estacion');
/*!40000 ALTER TABLE `punto_adquisicion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `usuario` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-14 18:34:31
