const pool = require('./connection.js');

async function createTables() {
  try {
    await pool.poolUser.query(`
      CREATE TABLE IF NOT EXISTS registered (
        userid SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        mobile VARCHAR(20) NOT NULL,
        organization VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        designation VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        id_proof BYTEA NOT NULL,
        user_type VARCHAR(50) NOT NULL,
        about VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        CONSTRAINT email_unique UNIQUE (email_address),
      );

      CREATE TABLE IF NOT EXISTS admin (
        userid SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        designation VARCHAR(255) NOT NULL,
        ip VARCHAR(40) NOT NULL,
        password VARCHAR(255) NOT NULL,
      );

      CREATE TABLE IF NOT EXISTS queries (
        sn SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        mobile VARCHAR(11) NOT NULL,
        occupation VARCHAR(100) NOT NULL,
        reason VARCHAR(255) NOT NULL,
        message VARCHAR(400) NOT NULL,
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

      // CREATE TABLE IF NOT EXISTS varifiedemail (
      //   sn SERIAL PRIMARY KEY,
      //   email  VARCHAR(200) NOT NULL,
      // ); 

      CREATE TABLE IF NOT EXISTS otpregister (
        sn SERIAL PRIMARY KEY,
        email  VARCHAR(200) NOT NULL,
        otp INTEGER,
        varify BOOLEAN
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
