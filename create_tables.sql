CREATE DATABASE IF NOT EXISTS L-ArmateurSQLBackend
USE L-ArmateurSQLBackend

DROP TABLE IF EXISTS oeuvres_mouvements;
DROP TABLE IF EXISTS mouvements_artistes;
DROP TABLE IF EXISTS mouvements;
DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS oeuvres;

CREATE TABLES artistes (
    idArtiste INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    contenu VARCHAR (1000) NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DEFAULT NULL,
    image_url VARCHAR(255)
);
CREATE TABLES mouvements (
    idMouvement INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    contenu VARCHAR (150) NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DEFAULT NULL,
     image_url VARCHAR(255)
    
);

CREATE TABLES oeuvres (
    idOeuvre INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    contenu VARCHAR (1000) NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DEFAULT NULL,
    image_url VARCHAR(255),
    idArtiste INT,
    stock INT CHECK (stock >= 0)
    FOREIGN KEY (idArtiste) REFERENCES artistes(idArtiste) ON DELETE SET NULL
);