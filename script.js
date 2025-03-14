import mariadb from "mariadb";

const pool = mariadb.createPool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  multipleStatements: true,
});

const seed = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      await conn.query(
        `DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS oeuvres_mouvements;
        DROP TABLE IF EXISTS mouvements_artistes;
        DROP TABLE IF EXISTS oeuvres;
        DROP TABLE IF EXISTS mouvements;
        DROP TABLE IF EXISTS artistes;
        CREATE TABLE users (
          id UUID PRIMARY KEY,
          pseudonym VARCHAR(64),
          mail VARCHAR(64) UNIQUE,
          password VARCHAR(128),
          description TEXT
          );
        CREATE TABLE artistes (
          idArtiste UUID PRIMARY KEY,
          nom VARCHAR(50) NOT NULL,
          contenu TEXT NOT NULL,
          date_debut DATE NOT NULL,
          date_fin DATE DEFAULT NULL,
          image_url VARCHAR(255)
          );
        CREATE TABLE mouvements (
          idMouvement UUID PRIMARY KEY,
          nom VARCHAR(50) NOT NULL,
          contenu VARCHAR(150) NOT NULL,
          date_debut DATE NOT NULL,
          date_fin DATE DEFAULT NULL,
          image_url VARCHAR(255)
          );
        CREATE TABLE oeuvres (
          idOeuvre UUID PRIMARY KEY,
          nom VARCHAR(50) NOT NULL,
          contenu VARCHAR(1000) NOT NULL,
          date_debut DATE NOT NULL,
          date_fin DATE DEFAULT NULL,
          image_url VARCHAR(255),
          idArtiste UUID,
          stock INT CHECK (stock >= 0),
          FOREIGN KEY (idArtiste) REFERENCES artistes (idArtiste) ON DELETE SET NULL
          );
        CREATE TABLE oeuvres_mouvements (
          idOeuvre UUID,
          idMouvement UUID,
          PRIMARY KEY (idOeuvre,
          idMouvement),
          FOREIGN KEY (idOeuvre) REFERENCES oeuvres (idOeuvre) ON DELETE CASCADE,
          FOREIGN KEY (idMouvement) REFERENCES mouvements (idMouvement) ON DELETE CASCADE
          );
        CREATE TABLE mouvements_artistes (
          idMouvement INT,
          idArtiste INT,
          PRIMARY KEY (idMouvement,
         idArtiste),
          FOREIGN KEY (idMouvement) REFERENCES mouvements (idMouvement) ON DELETE CASCADE,
          FOREIGN KEY (idArtiste) REFERENCES artistes (idArtiste) ON DELETE CASCADE
          );
        `
      );
      await conn.commit();
      console.log("DB seeded");
    } catch (err) {
      await conn.rollback();
      throw err;
    }
  } catch (err) {
    console.log("seed.js");
    console.log(err);
  }
};

seed().then(() => {
  pool.end();
});
