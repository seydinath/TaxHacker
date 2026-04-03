-- Create database if it doesn't exist
CREATE DATABASE taxhacker;

-- Connect to the new database and set up user permissions
\c taxhacker

-- Grant all privileges on the database to postgres user
GRANT ALL PRIVILEGES ON DATABASE taxhacker TO postgres;
