-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    time TIMESTAMP NOT NULL,
    description TEXT NOT NULL,
    importance TEXT NOT NULL,
    status TEXT NOT NULL
);