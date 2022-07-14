/* This will drop/delete the tables every time you run the schema.sql file, ensuring you */
/* start with a clean slate. Teh candidates table must be dropped before the parties table */
/* due to the foreign key contraint that requires the parties table to exist. A foreign key */
/* is a field in one table that references the primary key of another table (id value) */
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties;

/* VARCHAR data type must declare a limit on the length, but TEXT can store much longer */
/* strings of varying length. Overuse of TEXT can bloat the database however. */
CREATE TABLE parties (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);
/* Creates a new voters table. DEFAULT specifies what hte value should be if no value is */
/* provided. DATETIME is a datatype that looks like 2020-01-01 13:00:00 and the front end */
/* team can take that value and convert it with JavaScript's Date() constructor and display */
/* anything they want at that point. CURRENT_TIMESTAMP returns the current date and time in */
/* the aforementioned format. This will be based on what time it is according to your server, */
/* not the client's machine. */
CREATE TABLE voters (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

/* Creates a table named candidates on the current database */
CREATE TABLE candidates (

    /* The id is designated using the PRIMARY KEY and AUTO_INCREMENT atributes. PRIMARY KEY */
    /* states that each value in this volumn must be unique for each record in the table. By */
    /* definition PRIMARY KEY must contain a value. */
    /* AUTO_INCREMENT increments with each successive row and assigns that new value to the id */
    /* This keyword ensures that even if all other column values are identical for multiple */
    /* records, the id will always be different so that the records are indistinguishable from */
    /* each other. INTEGER, VARCHAR, and BOOLEAN are data types that come after column name. */
    id INTEGER AUTO_INCREMENT PRIMARY KEY,

    /* The NOT NULL keyword means that a column must contain a value and missing values are not */
    /* accepted. NULL would mean it's ok for a record to not have a value in a specific column. */
    first_name VARCHAR(30) NOT NULL,

    /* VARCHAR is followed by a parenthesis and a number. It stands for cariable character and */
    /* the number represnets the number of characters that the column's values can have. BOOLEAN */
    /* and integer don't need a size limit and most numbers in common use are only so large, but */
    /* a text field would be as long as a book. Since data storage can be expensive, it's important */
    /* to limit the amount of space that each field uses, especially for huge tables. */
    last_name VARCHAR(30) NOT NULL,

    party_id INTEGER,

    /* BOOLEAN and INTEGER are data types and they follow column names, which must not contain */
    /* spaces and are normally lowercase. */
    industry_connected BOOLEAN NOT NULL,

    /* CONSTRAINT allows ut to flag the party)id field as an official foreign key and tells SQL */
    /* which table and field it references. In this case, it references the id field in the parties */
    /* table. This ensures no id can be inserted into the candidates table if it doesn't also exist */
    /* in the parties table. MySQL will return an error for any operation that would violate a */
    /* constraint. Since this constraint relies on the parties table, the parties table MUST be */
    /* defined first before the candidates table. ON DELETE SET NULL tells SQL to set a candidate's */
    /* party_id field to NULL if the corresponding row in parties is ever deleted. */
    CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);

/* CLI command that describe's the table's fields and field attributes but doesn't display any */
/* of the table's data or records. */
/* DESCRIBE candidates; */

/* SELECT identifies the action to take place. We could list the individual column names separated */
/* by commas, but se use the wildcard *, which means "all the columns". FROM designates where */
/* we'll be retrieving the data from, which is candidates in this case. */
/* SELECT * FROM candidates; */

/* We use the following to select only from certain columns and display it as a table */
/* SELECT first_name, last_name FROM candidates; */

/* SELECT retrieves specific information from certain columns and WHERE filters data from huge */
/* tables. In this case, we are selecting the two columns from table candidates if they have */
/* an industry_connected value of 1. The WHERE clause is followed by an expression that SQL */
/* evalutes to be true or false. In this circumstance, the equal sign is being evaluated as */
/* an equality operator, similar to the === in JavaScript's comparison operator, not the */
/* assignment operator. */
/* SELECT first_name, industry_connected
FROM candidates
WHERE industry_connected = 1; */