/*const { pg } = require('pg');
new client = pg.connect();*/

/* PostgreSQL database*/

/*CREATE TABLESPACES*/

/*
CREATE TABLESPACE ts_primary
LOCATION 'c:\pgdata\primary';

CREATE TABLESPACE ts_archive
LOCATION 'c:\<directory>'*/


/*VIEW ACTIVE DATABASE CONNNECTIONS  (could wrap this in an if statement)*/

/*SELECT
  *
FROM
  pg_stat_activity
WHERE
  datname = 'productsdb';*/

/* DISCONNECT FROM DATABASE*/

/*SELECT
	pg_terminate_backend (pg_stat_activity.pid)
FROM
	pg_stat_activity
WHERE
	pg_stat_activity.datname = 'productsdb';*/

/* CREATE DATABASE */

/*DROP DATABASE IF EXISTS productsdb;
CREATE DATABASE productsdb
WITH
  OWNER = postgres
  ENCODING = 'UTF8'
  TABLESPACE = ts_primary
  IS_TEMPLATE = true;*/

/*should I create a new schema?*/



/*client.end();*/


