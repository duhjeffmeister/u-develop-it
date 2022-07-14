INSERT INTO parties (name, description)
VALUES
    ('JS Juggernauts', 'The JS Juggernauts eat, breathe, and sleep JavaScript. They can build everything you could ever want in JS, including a new kitchen sink.'),
    ('Heroes of HTML', 'Want to see a mock-up turn into an actual webpage in a matter of minutes? Well, the Heroes of HTML can get it done in a matter of seconds.'),
    ('Git Gurus', 'Need to resolve a merge conflict? The Git Gurus have your back. Nobody knows Git like these folks do.');

/* INSERT INTO is followed by candidates, which signifies that we'll be loading data into the */
/* candidates table. After that is a set of parenthesis that have the columns we'll be inserting */
/* into, which are comma separated. */
INSERT INTO candidates (first_name, last_name, party_id, industry_connected)

/* VALUES plus the parenthetical code after are the data values we wish to load into the table. */
/* VARCHAR values must be surrounded by quotes because they are strings. You can use ' without */
/* decimals, but " must be used when containing anything more than letters. The order of VALUES */
/* must match the order of the columns in the statement after INSERT INTO candidates. */
VALUES
    ('Ronald', 'Firbank', 1, 1),
    ('Virginia', 'Woolf', 1, 1),
    ('Piers', 'Gaveston', 1, 0),
    ('Charles', 'LeRoi', 2, 1),
    ('Katherine', 'Mansfield', 2, 1),
    ('Dora', 'Carrington', 3, 0),
    ('Edward', 'Bellamy', 3, 0),
    ('Montague', 'Summers', 3, 1),
    ('Octavia', 'Butler', 3, 1),
    ('Unica', 'Zurn', NULL, 1);

