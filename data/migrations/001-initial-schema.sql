--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Users (
  id         INTEGER   PRIMARY KEY,
  email      TEXT      NOT NULL,
  password   TEXT      NOT NULL,
  name       TEXT      NOT NULL,
  follows    TEXT      NOT NULL
);

CREATE TABLE Posts (
  id             INTEGER   PRIMARY KEY,
  description    TEXT      NOT NULL,
  url            TEXT      NOT NULL
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE Users;
DROP TABLE Posts;
