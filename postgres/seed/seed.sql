BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) values('Jessie', 'jessie@gmail.com', 5, '2018-01-01');
INSERT INTO login (hash, email) values ('$2b$10$iR0EbUtmACnFTDO1vBstReDWaw7E0zced1R95FDzRPeUtdQoBxKf6', 'jessie@gmail.com');

COMMIT;