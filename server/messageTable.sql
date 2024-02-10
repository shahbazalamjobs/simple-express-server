CREATE TABLE messageTable (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL
);

INSERT INTO messageTable (content) VALUES
    ('Hello, World!'),
    ('Welcome to our website.'),
    ('Have a nice day!');

SELECT * FROM messageTable;
