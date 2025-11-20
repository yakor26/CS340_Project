-- Citation for the following code:
-- Date: 11/20/2025
-- Adapted from:
-- Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25645149

-- CREATE SECTION ---
-- create for Books
DROP PROCEDURE IF EXISTS sp_createBook;
DELIMITER //
CREATE PROCEDURE sp_createBook(
    IN p_title VARCHAR(100),
    IN p_pageCount INT,
    IN p_publishDate DATE,
    IN p_advanceAmount DECIMAL(8,2),
    OUT p_bookID INT
)
BEGIN
    INSERT INTO Books(title, pageCount, publishDate, advanceAmount)
    VALUES(p_title, p_pageCount, p_publishDate, p_advanceAmount);

    SELECT LAST_INSERT_ID() into p_bookID;
END //
DELIMITER ;

-- create for Authors
DROP PROCEDURE IF EXISTS sp_createAuthor;
DELIMITER //
CREATE PROCEDURE sp_createAuthor(
    IN p_firstName VARCHAR(50),
    IN p_lastName VARCHAR(50),
    IN p_email VARCHAR(100),
    OUT p_authorID INT
)
BEGIN
    INSERT INTO Authors(firstName, lastName, email)
    VALUES(p_firstName, p_lastName, p_email);

    SELECT LAST_INSERT_ID() into p_authorID;
END //
DELIMITER ;

-- create for Buyers
DROP PROCEDURE IF EXISTS sp_createBuyer;
DELIMITER //
CREATE PROCEDURE sp_createBuyer(
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_organizationBuyer TINYINT(1),
    OUT p_buyerID INT
)
BEGIN
    INSERT INTO Buyers(name, email, organizationBuyer)
    VALUES(p_name, p_email, p_organizationBuyer);

    SELECT LAST_INSERT_ID() into p_buyerID;
END //
DELIMITER ;

-- create for Formats
DROP PROCEDURE IF EXISTS sp_createFormat;
DELIMITER //
CREATE PROCEDURE sp_createFormat(
    IN p_category VARCHAR(50),
    IN p_royaltyPercentage DECIMAL(5,2),
    OUT p_formatID INT
)
BEGIN
    INSERT INTO Formats(category, royaltyPercentage)
    VALUES(p_category, p_royaltyPercentage);

    SELECT LAST_INSERT_ID() into p_formatID;
END //
DELIMITER ;

-- create for Orders
DROP PROCEDURE IF EXISTS sp_createOrder;
DELIMITER //
CREATE PROCEDURE sp_createOrder(
    IN p_buyerID INT,
    IN p_orderDate DATE,
    OUT p_orderID INT
)
BEGIN
    INSERT INTO Orders(buyerID, orderDate)
    VALUES(p_buyerID, p_orderDate);

    SELECT LAST_INSERT_ID() into p_orderID;
END //
DELIMITER ;

-- DELETE SECTION --
