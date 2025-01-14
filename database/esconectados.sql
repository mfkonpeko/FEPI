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
  `correo` varchar(45) NOT NULL,
  `contraseña` varchar(45) DEFAULT NULL,
  `institucion_academica` varchar(100) DEFAULT NULL,
  `carrera` varchar(45) DEFAULT NULL,
  `fecha_egreso` varchar(45) DEFAULT NULL,
  `area_interes_profesional` varchar(45) DEFAULT NULL,
  `habilidades_clave` varchar(500) DEFAULT NULL,
  `experiencia_laboral` varchar(500) DEFAULT NULL,
  `idiomas` varchar(100) DEFAULT NULL,
  `certificaciones` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datos_egresado`
--

LOCK TABLES `datos_egresado` WRITE;
/*!40000 ALTER TABLE `datos_egresado` DISABLE KEYS */;
INSERT INTO `datos_egresado` VALUES ('Ana Karen','Soto Medina','5591234567','anakaren@gmail.com','ana','Tecnológico de Monterrey','Ingeniería en Tecnologías de la Información','2022-12-05','Ciberseguridad y Redes','Ethical Hacking, Redes, Linux, Python, Wireshark, Kali Linux','Ninguna','Ingles, Español','Ninguna'),('José Julian','Ramírez Ramirez','5534789621','joseantonio@gmail.com','jose','Instituto Politécnico Nacional','Ingeniería en Sistemas Computacionales','2022-06-15','Desarrollo Backend y Cloud Computing','Java, Python, AWS, Docker, MongoDB, Spring Boot','Google analista de datos 2023 a 2024, Microsoft programador 2022 a 2023','Español','Google cloud, Amazon WBS'),('María Isabel','Torres Velázquez','5587234169','mariaisabel@gmail.com','maria','Universidad Nacional Autónoma de México','Ingeniería en Computación','2021-12-10','Inteligencia Artificial y Machine Learning','Python, TensorFlow, Scikit-learn, R, SQL, Deep Learning','Ninguna','Ingles, Españo, Francesl','Ninguna'),('Roberto Carlos','Pacheco Luna','5562893417','robertocarlos@gmail.com','roberto','Instituto Tecnológico Autónomo de México','Ingeniería en Tecnologías Computacionales','2023-05-20','Desarrollo Frontend y UX/UI','JavaScript, React, Angular, HTML5, CSS3, Figma','Ninguna','Español','Ninguna');
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
  `correo` varchar(45) NOT NULL,
  `contraseña` varchar(45) DEFAULT NULL,
  `area_trabajo` varchar(45) DEFAULT NULL,
  `rfc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datos_empresa`
--

LOCK TABLES `datos_empresa` WRITE;
/*!40000 ALTER TABLE `datos_empresa` DISABLE KEYS */;
INSERT INTO `datos_empresa` VALUES ('Esconectados','Maximiliano Fernando Perez Leon','5500112233','admin@gmail.com','admin','Sistemas','ESC891117WS5 '),('Amazon','Ana Laura Sánchez Quiroz','5572569034','amazon@gmail.com','amazon','Sistemas','AMA130904KL8 '),('Cisco','María Fernanda Ramírez Ochoa','5589345612','cisco@gmail.com','cisco','Sistemas','CIS950830MT4 '),('Globant','Ricardo Guzmán Torres','5563894521','globant@gmail.com','globant','Sistemas','GLO080315PL9 '),('IBM','Carlos Eduardo López Miranda','5562789430','ibm@gmail.com','ibm','Sistemas','IBM820715ST6 '),('Microsoft','Daniel Martínez Velasco','5584237691','microsoft@gmail.com','microsoft','Sistemas','MSF921231KL9'),('Oracle','Patricia Hernández Rivas','5591458267','oracle@gmail.com','oracle','Sistemas','ORA891117HT5 ');
/*!40000 ALTER TABLE `datos_empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleos`
--

DROP TABLE IF EXISTS `empleos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleos` (
  `vacante` varchar(100) NOT NULL,
  `empresa` varchar(100) DEFAULT NULL,
  `modalidad` varchar(100) DEFAULT NULL,
  `salario` varchar(100) DEFAULT NULL,
  `descripcion` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`vacante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleos`
--

LOCK TABLES `empleos` WRITE;
/*!40000 ALTER TABLE `empleos` DISABLE KEYS */;
INSERT INTO `empleos` VALUES ('Cibersecurity Analyst','Cisco Systems','Presencial','$50,000 MXN mensuales','Monitoreo de seguridad, análisis de vulnerabilidades y respuesta a incidentes. Certificaciones en seguridad y experiencia en ethical hacking.'),('Data Scientist','Oracle','Remoto','$48,000 MXN mensuales','Análisis de big data, machine learning y modelos predictivos. Experiencia en Python, R y frameworks de ML. Estadística avanzada.'),('Desarrollador Backend','Microsoft','Híbrido','$45,000 MXN mensuales','Desarrollo de APIs y microservicios usando .NET Core. Experiencia en SQL Server y Azure. Conocimientos en patrones de diseño y arquitectura limpia.'),('DevOps Engineer','Amazon','Remoto','$55,000 MXN mensuales','Implementación de CI/CD, gestión de infraestructura cloud y automatización. Experiencia con Docker, Kubernetes y Jenkins.'),('Full Stack Developer','IBM','Híbrido','$42,000 MXN mensuales','Desarrollo web con React y Node.js. Experiencia en MongoDB y AWS. Conocimientos en arquitectura de software y API RESTful.'),('QA Automation','Globant','Híbrido','$35,000 MXN mensuales','Desarrollo de pruebas automatizadas, testing funcional. Manejo de Selenium, TestNG y herramientas de testing. Metodologías ágiles.');
/*!40000 ALTER TABLE `empleos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postulaciones`
--

DROP TABLE IF EXISTS `postulaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postulaciones` (
  `correo_postulado` varchar(45) DEFAULT NULL,
  `tipo_vacante` varchar(45) DEFAULT NULL,
  `empresa` varchar(45) DEFAULT NULL,
  `nombre_vacante` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postulaciones`
--

LOCK TABLES `postulaciones` WRITE;
/*!40000 ALTER TABLE `postulaciones` DISABLE KEYS */;
INSERT INTO `postulaciones` VALUES ('anakaren@gmail.com','empleo','Microsoft','Desarrollador Backend'),('joseantonio@gmail.com','servicio social','Amazon','Prácticas en Inteligencia Artificial');
/*!40000 ALTER TABLE `postulaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicio_social`
--

DROP TABLE IF EXISTS `servicio_social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicio_social` (
  `vacante` varchar(100) NOT NULL,
  `modalidad` varchar(100) DEFAULT NULL,
  `nombre_empresa` varchar(100) DEFAULT NULL,
  `descripcion` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`vacante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicio_social`
--

LOCK TABLES `servicio_social` WRITE;
/*!40000 ALTER TABLE `servicio_social` DISABLE KEYS */;
INSERT INTO `servicio_social` VALUES ('Prácticas en Análisis de Datos','Presencial','Cisco Systems','Analizar y procesar grandes conjuntos de datos con tecnologías como Azure y Power BI.'),('Prácticas en Desarrollo de Software','Remoto','Oracle','Desarrollar soluciones de software innovadoras con tecnologías como Java y Python.'),('Prácticas en Diseño de Experiencias de Usuario','Híbrida','Microsoft','Diseñar experiencias de usuario únicas y accesibles con tecnologías como Sketch y Figma.'),('Prácticas en Inteligencia Artificial','Presencial','Amazon','Desarrollar soluciones de inteligencia artificial con tecnologías como TensorFlow y PyTorch.'),('Prácticas en Investigación y Desarrollo de Tecnologías','Híbrida','Globant','Investigar y desarrollar nuevas tecnologías de la información, como la realidad virtual y la realidad aumentada.'),('Prácticas en Seguridad Informática','Remoto','IBM','Proteger sistemas y redes de ataques cibernéticos con tecnologías como firewall y antivirus.');
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

-- Dump completed on 2025-01-14  0:56:03
