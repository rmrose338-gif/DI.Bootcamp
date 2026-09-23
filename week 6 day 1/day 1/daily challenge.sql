 exists to avoid primary key conflicts
DROP TABLE IF EXISTS actors;


CREATE TABLE actors (
    actor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    number_oscars INT NOT NULL
);

INSERT INTO actors (first_name, last_name, date_of_birth, number_oscars) VALUES 
('Matt', 'Damon', '1970-10-08', 1),
('George', 'Clooney', '1961-05-06', 2),
('Brad', 'Pitt', '1963-12-18', 1),
('Jennifer', 'Aniston', '1969-02-11', 0);

-- Insert actors with empty string fields (blanks)
INSERT INTO actors (first_name, last_name, date_of_birth, number_oscars)
VALUES ('', 'Smith', '1990-01-01', 2);

INSERT INTO actors (first_name, last_name, date_of_birth, number_oscars)
VALUES ('', '', '1990-01-01', 0);




-- Count total records in the table (Returns: 6)
SELECT COUNT(*) FROM actors;

-- View all rows to inspect inserted data
SELECT * FROM actors;

-- Find records where names were left blank
SELECT * FROM actors 
WHERE first_name = '' OR last_name = '';




-- Fix the blank first_name for 'Smith'
UPDATE actors
SET first_name = 'Will'
WHERE last_name = 'Smith' AND first_name = '';



-- Delete the record that has both first and last name blank
DELETE FROM actors
WHERE first_name = '' AND last_name = '';

-- Final check to verify cleanup (Returns: 5 actors)
SELECT * FROM actors;