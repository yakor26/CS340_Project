-- Midnight Slate Publishing House
-- Team 88
-- Group Members: Yetunde Korede, Charley Lotspeich, and Che-Han Hsu
-- Deliverable 3: DML SQL Queries

-- ========== BOOKS ==========
-- SELECT all books
SELECT * FROM Books;

-- INSERT a new book
INSERT INTO Books (title, pageCount, publishDate, advanceAmount)
VALUES (:title, :pageCount, :publishDate, :advanceAmount);

-- UPDATE a book by ID
UPDATE Books
SET title = :title,
    pageCount = :pageCount,
    publishDate = :publishDate,
    advanceAmount = :advanceAmount
WHERE bookID = :bookID;

-- DELETE a book
DELETE FROM Books
WHERE bookID = :bookID;



-- ========== AUTHORS ==========
SELECT * FROM Authors;

INSERT INTO Authors (firstName, lastName, email)
VALUES (:firstName, :lastName, :email);

UPDATE Authors
SET firstName = :firstName,
    lastName  = :lastName,
    email     = :email
WHERE authorID = :authorID;

DELETE FROM Authors
WHERE authorID = :authorID;



-- ========== BUYERS ==========
SELECT * FROM Buyers;

INSERT INTO Buyers (name, email, organizationBuyer)
VALUES (:name, :email, :organizationBuyer);

UPDATE Buyers
SET name = :name,
    email = :email,
    organizationBuyer = :organizationBuyer
WHERE buyerID = :buyerID;

DELETE FROM Buyers
WHERE buyerID = :buyerID;



-- ========== FORMATS ==========
SELECT * FROM Formats;

INSERT INTO Formats (category, royaltyPercentage)
VALUES (:category, :royaltyPercentage);

UPDATE Formats
SET category = :category,
    royaltyPercentage = :royaltyPercentage
WHERE formatID = :formatID;

DELETE FROM Formats
WHERE formatID = :formatID;



-- ========== ORDERS ==========
SELECT * FROM Orders;

INSERT INTO Orders (buyerID, orderDate)
VALUES (:buyerID, :orderDate);

UPDATE Orders
SET buyerID = :buyerID,
    orderDate = :orderDate
WHERE orderID = :orderID;

DELETE FROM Orders
WHERE orderID = :orderID;



-- ========== AUTHORSBOOKS ==========
SELECT * FROM AuthorsBooks;

INSERT INTO AuthorsBooks (authorID, bookID)
VALUES (:authorID, :bookID);

-- For UPDATE in intersection tables, you usually change one side of the pair
UPDATE AuthorsBooks
SET authorID = :authorID, bookID = :bookID
WHERE authorBookID = :authorBookID;

DELETE FROM AuthorsBooks
WHERE authorBookID = :authorBookID;


-- ========== BOOKSORDERS ==========
SELECT * FROM BooksOrders;

INSERT INTO BooksOrders (bookID, orderID, quantity)
VALUES (:bookID, :orderID, :quantity);

UPDATE BooksOrders
SET quantity = :quantity
WHERE bookOrderID = :bookOrderID;

DELETE FROM BooksOrders
WHERE bookOrderID = :bookOrderID;


-- ========== BOOKSFORMATS ==========
SELECT * FROM BooksFormats;

INSERT INTO BooksFormats (bookID, formatID, price)
VALUES (:bookID, :formatID, :price);

UPDATE BooksFormats
SET price = :price
WHERE bookFormatID = :bookFormatID;

DELETE FROM BooksFormats
WHERE bookFormatID = :bookFormatID;