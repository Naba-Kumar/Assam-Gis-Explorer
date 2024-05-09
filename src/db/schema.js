const pool = require('./connection.js'); 

async function createTables() {
  try {
    await pool.poolUser.query(`
      CREATE TABLE IF NOT EXISTS registered (
        userid SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS queries (
        sn SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      ); 

      CREATE TABLE IF NOT EXISTS catalog (
        sn SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        filename VARCHAR(200) NOT NULL,
        wmslink VARCHAR(200) NOT NULL,
        description VARCHAR(300) NOT NULL,
        display BOOLEAN
      ); 

      CREATE TABLE IF NOT EXISTS requests (
        sn SERIAL PRIMARY KEY,
        userid INT,
        filename  VARCHAR(255) NOT NULL,
        status BOOLEAN
      ); 

      CREATE TABLE IF NOT EXISTS  (
        sn SERIAL PRIMARY KEY,
        filename  VARCHAR(255) NOT NULL,
        fileid  interger,
      ); 

      CREATE TABLE IF NOT EXISTS  useraccess (
        sn SERIAL PRIMARY KEY,
        userid INT,
        files TEXT[],
        fileids INTEGER[]
      ); 



    // --  Add other tables here if needed
    `);
    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

createTables();
