-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: esconectados
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `datos_egresado`
--

DROP TABLE IF EXISTS `datos_egresado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datos_egresado` (
  `nombre` varchar(45) DEFAULT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `contraseña` varchar(45) NOT NULL,
  `institucion_academica` varchar(45) DEFAULT NULL,
  `carrera` varchar(45) DEFAULT NULL,
  `fecha_egreso` varchar(45) DEFAULT NULL,
  `area_interes_profesional` varchar(45) DEFAULT NULL,
  `habilidades_clave` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`contraseña`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datos_egresado`
--

LOCK TABLES `datos_egresado` WRITE;
/*!40000 ALTER TABLE `datos_egresado` DISABLE KEYS */;
INSERT INTO `datos_egresado` VALUES ('a','a','a','a@a','a','a','a','2025-01-14','a','a');
/*!40000 ALTER TABLE `datos_egresado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datos_empresa`
--

DROP TABLE IF EXISTS `datos_empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datos_empresa` (
  `nombre_empresa` varchar(45) DEFAULT NULL,
  `representante_legal` varchar(100) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `contraseña` varchar(45) NOT NULL,
  `area_trabajo` varchar(45) DEFAULT NULL,
  `rfc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`contraseña`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datos_empresa`
--

LOCK TABLES `datos_empresa` WRITE;
/*!40000 ALTER TABLE `datos_empresa` DISABLE KEYS */;
INSERT INTO `datos_empresa` VALUES ('a','a','a','a@a','a','a','a');
/*!40000 ALTER TABLE `datos_empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleos`
--

DROP TABLE IF EXISTS `empleos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleos` (
  `idempleos` int NOT NULL,
  `vacante` varchar(100) DEFAULT NULL,
  `empresa` varchar(100) DEFAULT NULL,
  `modalidad` varchar(100) DEFAULT NULL,
  `salario` varchar(100) DEFAULT NULL,
  `descripcion` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`idempleos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleos`
--

LOCK TABLES `empleos` WRITE;
/*!40000 ALTER TABLE `empleos` DISABLE KEYS */;
INSERT INTO `empleos` VALUES (1,'Desarrollador Backend','Microsoft','Híbrido','$45,000 MXN mensuales','Desarrollo de APIs y microservicios usando .NET Core. Experiencia en SQL Server y Azure. Conocimientos en patrones de diseño y arquitectura limpia.'),(2,'DevOps Engineer','Amazon','Remoto','$55,000 MXN mensuales','Implementación de CI/CD, gestión de infraestructura cloud y automatización. Experiencia con Docker, Kubernetes y Jenkins.'),(3,'QA Automation','Globant','Híbrido','$35,000 MXN mensuales','Desarrollo de pruebas automatizadas, testing funcional. Manejo de Selenium, TestNG y herramientas de testing. Metodologías ágiles.'),(4,'Data Scientist','Oracle','Remoto','$48,000 MXN mensuales','Análisis de big data, machine learning y modelos predictivos. Experiencia en Python, R y frameworks de ML. Estadística avanzada.'),(5,'Full Stack Developer','IBM','Híbrido','$42,000 MXN mensuales','Desarrollo web con React y Node.js. Experiencia en MongoDB y AWS. Conocimientos en arquitectura de software y API RESTful.'),(6,'Cibersecurity Analyst','Cisco Systems','Presencial','$50,000 MXN mensuales','Monitoreo de seguridad, análisis de vulnerabilidades y respuesta a incidentes. Certificaciones en seguridad y experiencia en ethical hacking.');
/*!40000 ALTER TABLE `empleos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicio_social`
--

DROP TABLE IF EXISTS `servicio_social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicio_social` (
  `idservicio_social` int NOT NULL,
  `vacante` varchar(100) DEFAULT NULL,
  `modalidad` varchar(100) DEFAULT NULL,
  `nombre_empresa` varchar(100) DEFAULT NULL,
  `descripcion` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`idservicio_social`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicio_social`
--

LOCK TABLES `servicio_social` WRITE;
/*!40000 ALTER TABLE `servicio_social` DISABLE KEYS */;
INSERT INTO `servicio_social` VALUES (1,'Prácticas en Desarrollo de Software','Remoto','Google','Desarrollar soluciones de software innovadoras con tecnologías como Java y Python.'),(2,'Prácticas en Análisis de Datos','Presencial','Microsoft','Analizar y procesar grandes conjuntos de datos con tecnologías como Azure y Power BI.'),(3,'Prácticas en Diseño de Experiencias de Usuario','Híbrida','Apple','Diseñar experiencias de usuario únicas y accesibles con tecnologías como Sketch y Figma.'),(4,'Prácticas en Seguridad Informática','Remoto','IBM','Proteger sistemas y redes de ataques cibernéticos con tecnologías como firewall y antivirus.'),(5,'Prácticas en Inteligencia Artificial','Presencial','Amazon','Desarrollar soluciones de inteligencia artificial con tecnologías como TensorFlow y PyTorch.'),(6,'Prácticas en Investigación y Desarrollo de Tecnologías','Híbrida','Samsung','Investigar y desarrollar nuevas tecnologías de la información, como la realidad virtual y la realidad aumentada.');
/*!40000 ALTER TABLE `servicio_social` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-12 22:06:59
