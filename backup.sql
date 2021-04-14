-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: CONTROL_GASTOS
-- ------------------------------------------------------
-- Server version	8.0.19

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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (15,'0yXGJpYJIHZcgAbtZgzu46H2dRr1','Casa','hogar'),(28,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Casa','Lugar donde vivo.'),(29,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Casa','Lugar en el cual vivo.'),(30,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Carro',NULL),(31,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Mercado',NULL),(32,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Entretenimiento',NULL),(33,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Vestuario',NULL),(34,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Salud',NULL),(36,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Viajes','Avion o barco'),(40,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Taller','Lugar donde trabajo.');
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concepto`
--

LOCK TABLES `concepto` WRITE;
/*!40000 ALTER TABLE `concepto` DISABLE KEYS */;
INSERT INTO `concepto` VALUES (1,3,'0yXGJpYJIHZcgAbtZgzu46H2dRr1','Arriendo',NULL),(2,3,'0yXGJpYJIHZcgAbtZgzu46H2dRr1','Servicios',NULL),(3,13,'0yXGJpYJIHZcgAbtZgzu46H2dRr1','Arriendo','caro'),(4,13,'0yXGJpYJIHZcgAbtZgzu46H2dRr1','Servicios','bajos'),(7,15,'0yXGJpYJIHZcgAbtZgzu46H2dRr1','Arriendo','caro'),(11,28,'e5SvJAwZz0MmT1iXesUvybz9mkm1','Servicios p├║blicos',NULL),(12,29,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Servicios',NULL),(13,29,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Impuestos',NULL),(14,29,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Administraci├│n',NULL),(15,30,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Operaci├│n',NULL),(16,30,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Mantenimiento',NULL),(17,30,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Impuestos',NULL),(18,36,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Viaje a espa├▒a','cuidado con el covid'),(21,29,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Servicios p├║blicos.',NULL),(22,39,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Arriendo',NULL),(23,40,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Arriendo',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimiento`
--

LOCK TABLES `movimiento` WRITE;
/*!40000 ALTER TABLE `movimiento` DISABLE KEYS */;
INSERT INTO `movimiento` VALUES (1,23,10,16,30,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','2021-01-30',65,13500.00,'Estimado'),(2,20,8,15,30,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','2021-01-30',65,13500.00,'Adquirido'),(3,21,5,12,29,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','2021-01-31',25,3500.00,'Adquirido'),(4,45,17,22,39,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','2021-02-01',1,850000.00,'Estimado'),(5,46,18,23,40,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','2021-02-01',2,965890.00,'Adquirido');
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_servicio`
--

LOCK TABLES `producto_servicio` WRITE;
/*!40000 ALTER TABLE `producto_servicio` DISABLE KEYS */;
INSERT INTO `producto_servicio` VALUES (1,7,15,'0yXGJpYJIHZcgAbtZgzu46H2dRr1','cuota','pesos',NULL),(3,11,28,'e5SvJAwZz0MmT1iXesUvybz9mkm1','acueducto','cm3',NULL),(4,12,29,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Agua','L^3',NULL),(5,12,29,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Luz','kw/hora',NULL),(7,12,29,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Telefon├¡a','Mes',NULL),(8,15,30,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Gasolina','Gal├│n',NULL),(9,15,30,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','L├¡quido de frenos','Por tarro',NULL),(10,16,30,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Cambio de llantas','Por servicio',NULL),(11,16,30,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Cambio de bater├¡a','Por servicio',NULL),(12,17,30,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Rodamiento','Anual',NULL),(13,17,30,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','SOAT','Anual',NULL),(14,18,36,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Ticketes','unidad','baratos'),(17,22,39,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','cuota','mes',NULL),(18,23,40,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','cuota','mes',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `punto_adquisicion`
--

LOCK TABLES `punto_adquisicion` WRITE;
/*!40000 ALTER TABLE `punto_adquisicion` DISABLE KEYS */;
INSERT INTO `punto_adquisicion` VALUES (18,'0yXGJpYJIHZcgAbtZgzu46H2dRr1','La Minorista','Medell├¡n','El mejor'),(19,'e5SvJAwZz0MmT1iXesUvybz9mkm1','La Mayorista','Medell├¡n','Lugar favorito.'),(20,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','La Mayorista','Medell├¡n',NULL),(21,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','La Minorista','Medell├¡n',NULL),(23,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','├ëxito de envigado','Envigado','cerca'),(45,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','El tesoro','Medell├¡n','Lugar favorito.'),(46,'agDvR4JTFyfpeqmFoq2bwwUjyTl2','Puerta del norte','Estaci├│n Niqu├¡a',NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2021-04-14  9:18:15
