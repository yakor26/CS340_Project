-- Midnight Slate Publishing House
-- Team 88
-- Group Members: Yetunde Korede, Charley Lotspeich, and Che-Han Hsu
-- Model: New Model    Version: 1.0
-- Citations:
-- Based on:
-- Forward engineered using MySQL Forward Engineering
-- MySQL Workbench Forward Engineering
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Table for Buyers
-- -----------------------------------------------------
DROP TABLE IF EXISTS Buyers ;
CREATE TABLE IF NOT EXISTS Buyers (
  buyerID INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  organizationBuyer TINYINT(1) DEFAULT 0 NOT NULL,
  PRIMARY KEY (buyerID));

-- -----------------------------------------------------
-- Table for Books
-- -----------------------------------------------------
DROP TABLE IF EXISTS Books ;
CREATE TABLE IF NOT EXISTS Books (
  bookID INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  pageCount INT NULL,
  publishDate DATE NOT NULL,
  advanceAmount DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (bookID),
  -- UNIQUE INDEX bookID_UNIQUE (bookID ASC));
);
-- -----------------------------------------------------
-- Table for Authors
-- -----------------------------------------------------
DROP TABLE IF EXISTS Authors ;
CREATE TABLE IF NOT EXISTS Authors (
  authorID INT NOT NULL UNIQUE AUTO_INCREMENT,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (authorID),
  -- UNIQUE INDEX authorID_UNIQUE (authorID ASC),
  -- UNIQUE INDEX email_UNIQUE (email ASC));
);
  
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Table for Orders
-- -----------------------------------------------------
DROP TABLE IF EXISTS Orders ;
CREATE TABLE IF NOT EXISTS Orders (
  orderID INT NOT NULL AUTO_INCREMENT,
  buyerID INT NOT NULL,
  orderDate DATE NOT NULL,
  PRIMARY KEY (orderID),
  INDEX fk_Orders_Buyers1_idx (buyerID ASC),
  CONSTRAINT fk_Orders_Buyers1
    FOREIGN KEY (buyerID)
    REFERENCES Buyers (buyerID)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- -----------------------------------------------------
-- Table for BooksOrders
-- -----------------------------------------------------
DROP TABLE IF EXISTS BooksOrders ;
CREATE TABLE IF NOT EXISTS BooksOrders (
  bookID INT NOT NULL,
  orderID INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (bookID, orderID),
  INDEX fk_Books_has_Orders_Orders1_idx (orderID ASC),
  INDEX fk_Books_has_Orders_Books1_idx (bookID ASC),
  CONSTRAINT fk_Books_has_Orders_Books1
    FOREIGN KEY (bookID)
    REFERENCES Books (bookID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_Books_has_Orders_Orders1
    FOREIGN KEY (orderID)
    REFERENCES Orders (orderID)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- -----------------------------------------------------
-- Table for Formats
-- -----------------------------------------------------
DROP TABLE IF EXISTS Formats ;
CREATE TABLE IF NOT EXISTS Formats (
  formatID INT NOT NULL AUTO_INCREMENT,
  category ENUM("Paperback", "Hardcover", "Audiobook", "Ebook") NOT NULL,
  royaltyPercentage DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (formatID),
  -- UNIQUE INDEX formatID_UNIQUE (formatID ASC),
  -- UNIQUE INDEX category_UNIQUE (category ASC));
);


-- -----------------------------------------------------
-- Table for BooksFormats
-- -----------------------------------------------------
DROP TABLE IF EXISTS BooksFormats ;
CREATE TABLE IF NOT EXISTS BooksFormats (
  bookID INT NOT NULL,
  formatID INT NOT NULL,
  price DECIMAL(5,2) NULL,
  PRIMARY KEY (bookID, formatID),
  INDEX fk_Books_has_Formats_Formats1_idx (formatID ASC),
  INDEX fk_Books_has_Formats_Books1_idx (bookID ASC),
  CONSTRAINT fk_Books_has_Formats_Books1
    FOREIGN KEY (bookID)
    REFERENCES Books (bookID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_Books_has_Formats_Formats1
    FOREIGN KEY (formatID)
    REFERENCES Formats (formatID)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- -----------------------------------------------------
-- Table for AuthorsBooks
-- -----------------------------------------------------
DROP TABLE IF EXISTS AuthorsBooks ;
CREATE TABLE IF NOT EXISTS AuthorsBooks (
  authorID INT NOT NULL,
  bookID INT NOT NULL,
  PRIMARY KEY (authorID, bookID),
  INDEX fk_Authors_has_Books_Books1_idx (bookID ASC),
  INDEX fk_Authors_has_Books_Authors1_idx (authorID ASC),
  CONSTRAINT fk_Authors_has_Books_Authors1
    FOREIGN KEY (authorID)
    REFERENCES Authors (authorID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_Authors_has_Books_Books1
    FOREIGN KEY (bookID)
    REFERENCES Books (bookID)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- add to books
INSERT INTO Books (title, pageCount, publishDate, advanceAmount)
VALUES ('Deep in the Abyss', 340, '2025-01-22', 2500.00),
('The Nine Lives of Aurora Francis', 270, '2025-04-30', 8500.50),
('Journey Beyond the Stars', 423, '2025-08-02', 4350.00),
('A Walk to Forget', 237, '2025-04-04', 1200.00);

-- add to authors
INSERT INTO Authors (firstName, lastName, email)
VALUES ('Jennifer', 'Morton', 'mortonj@gmail.com'),
('David', 'Hughes', 'dhughes87@slatepress.com'),
('Nia', 'Williams', 'nmwilliams2@slatepress.com');

-- add to buyers
INSERT INTO Buyers (name, email, organizationBuyer)
VALUES ('Kings Public Library', 'kpc@kp.org', 1),
('Charles & Lobles', 'cloblescorp@clobes.com', 1),
('Alamazonia', 'bookbuyer@alamazonia.com', 1);

-- add to formats
INSERT INTO Formats (category, royaltyPercentage)
VALUES ('Paperback', 7.50),
('Hardcover', 12.25),
('Ebook', 20.50),
('Audiobook', 15.00);

-- add to orders
INSERT INTO Orders (buyerID, orderDate)
VALUES (3, '2025-03-22'),
(1, '2025-02-16'),
(3, '2025-07-08');

-- add to authors books intersection table
INSERT INTO AuthorsBooks (authorID, bookID)
VALUES (1, 3),
(2, 1),
(3, 2),
(2, 4);

-- add to book orders intersection table
INSERT INTO BooksOrders (orderID, bookID, quantity)
VALUES (1, 4, 1000),
(1, 2, 1200),
(2, 1, 100),
(2, 4, 80);

-- add to book formats table
INSERT INTO BooksFormats (bookID, formatID, price)
VALUES (1, 3, 11.99),
(3, 1, 19.99),
(3, 2, 35.99),
(1, 2, 30.99);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;