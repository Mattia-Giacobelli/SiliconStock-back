-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: tech_store
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Scheda Video','scheda-video'),(2,'Processore','processore'),(3,'Scheda Madre','scheda-madre'),(4,'RAM','ram'),(5,'SSD','ssd'),(6,'Case','case');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount_codes`
--

DROP TABLE IF EXISTS `discount_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount_codes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `discount_value` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_codes`
--

LOCK TABLES `discount_codes` WRITE;
/*!40000 ALTER TABLE `discount_codes` DISABLE KEYS */;
INSERT INTO `discount_codes` VALUES (1,'TECH10',10,'2026-01-01','2026-03-31'),(2,'SPRING25',25,'2026-03-01','2026-05-31'),(3,'MEGA50',50,'2026-11-25','2026-11-30');
/*!40000 ALTER TABLE `discount_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_products`
--

DROP TABLE IF EXISTS `order_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_products` (
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `order_products_chk_1` CHECK ((`quantity` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_products`
--

LOCK TABLES `order_products` WRITE;
/*!40000 ALTER TABLE `order_products` DISABLE KEYS */;
INSERT INTO `order_products` VALUES (1767963734241,1,1),(1767964088839,1,1),(1767964339549,1,1),(1767964339549,3,3),(1767964546559,1,1),(1767964546559,3,3),(1768403253974,1,1),(1768403253974,3,3),(1768403656104,1,1),(1768403656104,3,3),(1768514354088,1,1),(1768514354088,2,1),(1768514354088,3,1),(1768514354088,4,3),(1768514475589,1,1),(1768514475589,2,1),(1768514475589,3,1),(1768514475589,4,3),(1768521759151,2,1),(1768521759151,3,2),(1768521759151,4,3),(1768522870007,4,1),(1768568949738,4,1),(1768568991289,4,1),(1768570495585,4,1),(1768572200170,4,1),(1768572434560,4,1),(1768572723568,4,1),(1768573281040,4,1);
/*!40000 ALTER TABLE `order_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `email` varchar(150) NOT NULL,
  `shipping_address` text NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `discount_code_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `discount_code_id` (`discount_code_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`discount_code_id`) REFERENCES `discount_codes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1767963734241,'io','io','343243','io@io.com','via scoreggia 12',700.00,2),(1767964088839,'io','io','343243','io@io.com','via scoreggia 12',700.00,2),(1767964339549,'io','io','343243','io@io.com','via scoreggiaa 12',700.00,2),(1767964546559,'io','io','3432434444','io@io.com','via scoreggiaa 12',700.00,2),(1768403253974,'io','io','3432434444a','io@io.com','via scoreggiaa 12',700.00,2),(1768403656104,'io','io','3432434444','io@io.com','via scoreggiaa 12',700.00,2),(1768514354088,'Mattia','Giacobelli','3663283608','giacobelli.mattia12@gmail.com','Via Villa Castelli 3 ',4349.96,2),(1768514475589,'Mattia','Giacobelli','3663283608','giacobelli.mattia12@gmail.com','Via Villa Castelli 3 ',4349.96,2),(1768521759151,'Mattia','Giacobelli','3663283608','giacobelli.mattia12@gmail.com','Via Villa Castelli 3, ',2449.97,2),(1768522870007,'Mattia','Giacobelli','3663283608','giacobelli.mattia12@gmail.com','Via Villa Castelli 3, ',649.99,2),(1768568949738,'Mattia','Giacobelli','3663283608','giacobelli.mattia12@gmail.com','Via Villa Castelli 3, ',649.99,2),(1768568991289,'Mattia','Giacobelli','3663283608','giacobelli.mattia12@gmail.com','Via Villa Castelli 3, ',649.99,2),(1768570495585,'Mattia','Giacobelli','3663283608','giacobelli.mattia12@gmail.com','Via Villa Castelli 3, ',649.99,2),(1768572200170,'Mattia','Giacobelli','3663283608','giacobelli.mattia12@gmail.com','Via Villa Castelli 3, ',649.99,2),(1768572434560,'Mattia','Giacobelli','3663283608','giacobelli.mattia12@gmail.com','Via Villa Castelli 3, ',649.99,2),(1768572723568,'Mattia','Giacobelli','3663283608','giacobelli.mattia12@gmail.com','Via Villa Castelli 3, ',649.99,2),(1768573281040,'Mattia','Giacobelli','3663283608','giacobelli.mattia12@gmail.com','Via Villa Castelli 3, ',649.99,2);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `technical_specs` text NOT NULL,
  `img` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'NVIDIA RTX 4090 Founders Edition','nvidia-rtx-4090','Scheda video di fascia enthusiast progettata per il gaming 4K estremo e per carichi di lavoro professionali come rendering 3D, AI e video editing. La RTX 4090 offre prestazioni senza compromessi grazie all’architettura NVIDIA Ada Lovelace, supporto avanzato al Ray Tracing e DLSS 3 per immagini ultra-realistiche e frame rate elevatissimi anche nei titoli più esigenti.','24GB GDDR6X, PCIe 4.0, Ray Tracing, DLSS 3','nvidia-rtx-4090.jpg',1899.99,1),(2,'AMD Radeon RX 7900 XTX','amd-rx-7900-xtx','La AMD Radeon RX 7900 XTX è una GPU di fascia alta pensata per il gaming 4K e le alte prestazioni grafiche. Basata su architettura RDNA 3, garantisce un eccellente equilibrio tra potenza, efficienza energetica e qualità visiva, rendendola ideale per gamer enthusiast e creator.','24GB GDDR6, RDNA 3, PCIe 4.0','amd-rx-7900-xtx.jpg',1099.99,1),(3,'NVIDIA RTX 4070 Super','nvidia-rtx-4070-super','La NVIDIA RTX 4070 Super rappresenta una scelta eccellente per il gaming in QHD e 4K leggero. Offre supporto a Ray Tracing di nuova generazione e tecnologia DLSS 3, assicurando fluidità, immagini dettagliate e consumi ottimizzati per build gaming moderne.','12GB GDDR6X, DLSS 3, Ray Tracing','nvidia-rtx-4070-super.jpg',699.99,1),(4,'Intel Core i9-13900K','intel-i9-13900k','Processore Intel di fascia enthusiast progettato per utenti esigenti, gamer hardcore e professionisti. Il Core i9-13900K combina alte frequenze di clock con un elevato numero di core per garantire prestazioni eccellenti sia in single-core che in multi-core, ideale per gaming, streaming e produttività avanzata.','24 core, 32 thread, boost 5.8GHz','intel-i9-13900k.png',649.99,2),(5,'AMD Ryzen 9 7950X','amd-ryzen-9-7950x','Il Ryzen 9 7950X è il processore AMD di punta per creator e professionisti. Grazie ai suoi 16 core e 32 thread, offre prestazioni eccezionali in rendering, simulazioni, editing video e multitasking intenso, mantenendo alti livelli di efficienza energetica.','16 core, 32 thread, boost 5.7GHz','amd-ryzen-9-7950x.jpg',699.99,2),(6,'Intel Core i5-13600K','intel-i5-13600k','CPU estremamente versatile pensata per gaming ad alte prestazioni e produttività quotidiana. L’Intel Core i5-13600K garantisce ottimi frame rate nei giochi moderni e ottime prestazioni in applicazioni multi-thread, rendendolo uno dei migliori processori per rapporto qualità/prezzo.','14 core, 20 thread, boost 5.1GHz','intel-i5-13600k.jpeg',329.99,2),(7,'ASUS ROG Strix Z790-E','asus-z790-e','Scheda madre premium progettata per sfruttare al massimo le CPU Intel di ultima generazione. Offre supporto a DDR5, PCIe 5.0 e connettività avanzata, risultando ideale per build high-end orientate a gaming, overclock e workstation.','LGA1700, DDR5, PCIe 5.0, Wi-Fi 6E','asus-z790-e.png',489.99,3),(8,'MSI MAG B650 Tomahawk','msi-b650-tomahawk','Scheda madre affidabile e robusta per processori AMD Ryzen serie 7000. Perfetta per configurazioni gaming e produttive, offre ottima stabilità, supporto DDR5 e un eccellente sistema di alimentazione.','DDR5, PCIe 4.0, Wi-Fi 6','msi-b650-tomahawk.png',239.99,3),(9,'Gigabyte X670 Aorus Elite','gigabyte-x670-aorus','Scheda madre di fascia alta pensata per utenti che desiderano il massimo da piattaforma AM5. Ideale per sistemi avanzati grazie al supporto a memorie DDR5, PCIe di nuova generazione e componentistica di qualità.','DDR5, PCIe 5.0','gigabyte-x670-aorus.png',329.99,3),(10,'Corsair Vengeance 32GB DDR5','corsair-vengeance-32gb','Memoria RAM DDR5 ad alte prestazioni pensata per gaming di nuova generazione e applicazioni professionali. Offre velocità elevate e stabilità ottimale per sfruttare appieno le piattaforme più recenti.','32GB (2x16), 6000MHz','corsair-vengeance-32gb.jpeg',159.99,4),(11,'G.Skill Trident Z 16GB','gskill-tridentz-16gb','RAM DDR4 ideale per configurazioni gaming e workstation di fascia media. Garantisce ottime prestazioni, compatibilità elevata e affidabilità nel tempo.','16GB (2x8), 3600MHz','gskill-tridentz-16gb.jpg',89.99,4),(12,'Samsung 980 Pro 1TB','samsung-980-pro-1tb','SSD NVMe ad alte prestazioni progettato per ridurre drasticamente i tempi di caricamento di sistema operativo, giochi e applicazioni. Ideale per gamer e professionisti che cercano velocità e affidabilità.','PCIe 4.0, 7000MB/s','samsung-980-pro-1tb.jpeg',129.99,5),(13,'WD Black SN850X 2TB','wd-sn850x-2tb','SSD gaming di fascia alta ottimizzato per prestazioni estreme e carichi di lavoro intensivi. Perfetto per PC gaming avanzati e workstation grazie alle elevate velocità di lettura e scrittura.','PCIe 4.0, 7300MB/s','wd-sn850x-2tb.png',249.99,5),(14,'NZXT H7 Flow','nzxt-h7-flow','Case mid-tower progettato per garantire un flusso d’aria eccellente e un’estetica moderna. Ideale per build gaming e workstation grazie all’ampio spazio interno e al supporto per componenti di grandi dimensioni.','ATX, vetro temperato','nzxt-h7-flow.jpg',139.99,6),(15,'Corsair 4000D Airflow','corsair-4000d','Case ATX con design minimalista e airflow ottimizzato. Perfetto per build pulite ed efficienti, offre facilità di assemblaggio e un’ottima gestione dei cavi.','ATX, mesh frontale','corsair-4000d.jpg',119.99,6),(16,'Lian Li O11 Dynamic','lian-li-o11','Case premium pensato per configurazioni personalizzate e sistemi ad alte prestazioni. Il design a doppio vetro temperato valorizza l’estetica della build mantenendo ottime possibilità di raffreddamento.','ATX, doppio vetro','lian-li-o11.jpeg',169.99,6);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-16 15:37:48
