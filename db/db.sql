/* Deletes the database election if it exists */
DROP DATABASE IF EXISTS election;

/* Creates database called election */
CREATE DATABASE  election;

/* Uses the database election */
USE election;

/* source executes script files and the following is the file extension */
/* source db/db.sql */

/* UPDATE is used with the table we'd like to update. SET and the assignment statement */
/* update the new value to the column. WHERE indicates which row to be updated. The code */
/* reads that we'll be updating column industry_connected with a value of 1 where the id */
/* has a value of 3 */
/* UPDATE candidates
SET industry_connected = 1
WHERE id = 3; */

/* In this, WHERE is used to determine which rows will be affected. If the primary key is */
/* known, this is preferred over usign a name for several reasons. There could be another */
/* Montague in the table who wouldn't be happy that we dropped him from the race by mistake. */
/* A misspelled name could also cause an error in this operation. Knowing that id is a unique */
/* identifier because it's a primary key gives us mouch more confidence there won't be accidents */
/* in the DELETE operation. */
/* DELETE FROM candidates
WHERE first_name = "Montague"; */

/* SHOW DATABASES; */

/* SHOW TABLES; */

/* ALTER TABLE allows you to add a new field, delete an existing field, or modify a field. */
/* In this case, NO TNULL was not included because some of our candidates might not be affiliated */
/* with a party. */
/* ALTER TABLE candidates ADD COLMN party_id INTEGER; */

/* When added to a SELECT statement, a JOIN statement can merge two or more tables together, */
/* filling in the foreign keys with actual data. It works in multiple ways, very similarly to a */
/* Venn Diagram in terms of combinations. WE told SQL that we wanted to get everything from the */
/* candidates table combined with any rows from the parties table where the candidate's party_id */
/* matched a party's primary key. */
/* SELECT * FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id; */

/* Notice that we're using wildcard to return all of the column data from the candidates table, */
/* something we can't do with dot notation in JavaScript. We'll rename it sto something more */
/* meaningful as part of the query, as shown in the following: */

/* SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON
candidates.party_id = parties.id; */

/* The AS keywords lets you define an alias for your data, which is particularly useful when */
/* joining tables that might have overlapping field names. */