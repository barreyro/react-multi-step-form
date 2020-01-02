CREATE TABLE registrants (
  ID SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  interests VARCHAR(255) NOT NULL,
  tshirtSize VARCHAR(16) NOT NULL,
  location VARCHAR(255) NOT NULL
);

INSERT INTO registrants (email, firstName, lastName, interests, tshirtSize, location)
VALUES ('michael.scott@office.com', 'Michael', 'Scott', '"Internet of Things", "Web Hacking"', 'Mens L', 'Seattle')

INSERT INTO registrants (email, firstName, lastName, interests, tshirtSize, location)
VALUES ('pam.beesly@office.com', 'Pam', 'Beesly', ['Application Security', 'Getting Ahead of Attackers', 'Offensive Security'], 'Womens S', 'Seattle')

INSERT INTO registrants (email, firstName, lastName, interests, tshirtSize, location)
VALUES ('dwight.schrute@office.com', 'Dwight', 'Schrute', ['101 Talks & Workshops', 'Getting Ahead of Attackers', 'Offensive Security'], 'Mens L', 'Boston')

INSERT INTO registrants (email, firstName, lastName, interests, tshirtSize, location)
VALUES ('jim.halpert@office.com', 'Jim', 'Halpert', ['Application Security', 'Getting Ahead of Attackers', 'Internet of Things'], 'Mens L', 'San Diego')
