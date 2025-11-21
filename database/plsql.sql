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
    -- for debugging 
    SELECT LAST_INSERT_ID() AS new_book_id;
END //
DELIMITER ;

-- create for Authors
DROP PROCEDURE IF EXISTS sp_createAuthor;
DELIMITER //
CREATE PROCEDURE sp_createAuthor(
    IN p_firstName VARCHAR(50),
    IN p_lastName VARCHAR(50),
    IN p_email VARCHAR(100)
    OUT p_authorID INT
)
BEGIN
    INSERT INTO Authors(firstName, lastName, email)
    VALUES(p_firstName, p_lastName, p_email);

    SELECT LAST_INSERT_ID() AS p_authorID;
    SELECT LAST_INSERT_ID() AS new_author_id;
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
    SELECT LAST_INSERT_ID() AS new_buyer_id;
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
    SELECT LAST_INSERT_ID() AS new_format_id;

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
    SELECT LAST_INSERT_ID() AS new_order_id;
END //
DELIMITER ;

--------- DELETE SECTION ----------
-- delete book
DROP PROCEDURE IF EXISTS sp_deleteBook;

DELIMITER //
CREATE PROCEDURE sp_deleteBook(IN p_bookID INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- account for errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Books WHERE bookID = p_bookID;

        -- check id matches, if none raise error
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Books for id: ', p_bookID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- delete author --
DROP PROCEDURE IF EXISTS sp_deleteAuthor;

DELIMITER //
CREATE PROCEDURE sp_deleteAuthor(IN p_authorID INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- account for errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Authors WHERE authorID = p_authorID;

        -- check id matches, if none raise error
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Authors for id: ', p_authorID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- delete buyer --
DROP PROCEDURE IF EXISTS sp_deleteBuyer;

DELIMITER //
CREATE PROCEDURE sp_deleteBuyer(IN p_buyerID INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- account for errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Buyers WHERE buyerID = p_buyerID;

        -- check id matches, if none raise error
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Buyers for id: ', p_buyerID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;


-- delete format --
DROP PROCEDURE IF EXISTS sp_deleteFormat;

DELIMITER //
CREATE PROCEDURE sp_deleteFormat(IN p_formatID INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- account for errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Formats WHERE formatID = p_formatID;

        -- check id matches, if none raise error
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Formats for id: ', p_formatID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- delete order --
DROP PROCEDURE IF EXISTS sp_deleteOrder;

DELIMITER //
CREATE PROCEDURE sp_deleteOrder(IN p_orderID INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- account for errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Orders WHERE orderID = p_orderID;

        -- check id matches, if none raise error
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Orders for id: ', p_orderID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

