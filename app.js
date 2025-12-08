// Citation for the following code:
// Date: 11/05/2025
// Adapted from:
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131

// ########################################
// ########## SETUP
// import express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Enter port number
const PORT = 31582;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars'); // Import express-handlebars engine
app.engine('.hbs', engine({ extname: '.hbs'})); // Create instance of handlebars
app.set('view engine', '.hbs'); // Use handlebars engine for *.hbs files.




// ########################################
// ########## ROUTE HANDLERS
// READ ROUTES
app.get('/', async function (req, res) {
    try {
        res.render('home'); // Render the home.hbs file
        // try/except to render home 
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

// books 
app.get('/books', async function (req, res) {
    try {
        // query
        // added date format to convert for js to recognize
        const query1 = `SELECT bookID, title, pageCount, DATE_FORMAT(publishDate, '%Y-%m-%d') AS publishDate, advanceAmount
                        FROM Books`;
        // query to database
        const [books] = await db.query(query1);
        res.render('books', { books: books });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// authors 
app.get('/authors', async function (req, res) {
    try {
        // query
        const query2 = 'SELECT * FROM Authors';
        // query to database
        const [authors] = await db.query(query2);
        res.render('authors', { authors: authors });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// buyers 
app.get('/buyers', async function (req, res) {
    try {
        // submit query
        const query3 = 'SELECT * FROM Buyers';
        const [buyers] = await db.query(query3);
        res.render('buyers', {buyers: buyers});
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// formats 
app.get('/formats', async function (req, res) {
    try {
        // query
        const query4 = 'SELECT * FROM Formats';
        const [formats] = await db.query(query4);
        res.render('formats', {formats: formats});
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// orders 
app.get('/orders', async function (req, res) {
    try {
        // submit query, store results
        // added buyer query
        const query9 = 'SELECT buyerID, name FROM Buyers';
        const query5 = 'SELECT * FROM Orders';
        // query results
        const [buyers] = await db.query(query9);
        const [orders] = await db.query(query5);
        res.render('orders', { orders, buyers});
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// authorsbooks 
app.get('/authorsbooks', async function (req, res) {
    try {
        //submit query
        const query6 = `SELECT authorBookID, AuthorsBooks.authorID, AuthorsBooks.bookID, Authors.firstName, 
        Authors.lastName, Books.title AS bookTitle
                        FROM AuthorsBooks
                        JOIN Authors ON Authors.authorID = AuthorsBooks.authorID
                        JOIN Books ON Books.bookID = AuthorsBooks.bookID
                        ORDER BY authorBookID; `
        const query7 = "SELECT authorID, firstName, lastName FROM Authors";
        const query8 = "SELECT bookID, title FROM Books";
        const [authorsbooks] = await db.query(query6);
        const [authors] = await db.query(query7);
        const [books] = await db.query(query8);
        
        res.render('authorsbooks', { authorsbooks, authors, books});
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// booksorders 
app.get('/booksorders', async function (req, res) {
    try {
        // submit query
        const query7 = `SELECT bookOrderID, BooksOrders.bookID, BooksOrders.orderID, 
                        Books.title AS bookTitle, Orders.buyerID, Buyers.name AS buyer, BooksOrders.quantity
                        FROM BooksOrders
                        JOIN Books ON Books.bookID = BooksOrders.bookID
                        JOIN Orders ON Orders.orderID = BooksOrders.orderID
                        JOIN Buyers ON Buyers.buyerID = Orders.buyerID
                        ORDER BY bookOrderID`;
        const query8 = 'SELECT orderID, orderDate FROM Orders';
        const query9 = 'SELECT bookID, title FROM Books';
        const [orders] = await db.query(query8);
        const [books] = await db.query(query9);
        const [booksorders] = await db.query(query7);
        res.render('booksorders', { booksorders, orders, books});
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// booksformats 
app.get('/booksformats', async function (req, res) {
    try {
        // submit query
        const query8 = `SELECT bookFormatID, BooksFormats.bookID, BooksFormats.formatID,  BooksFormats.price,
                        Books.title AS bookTitle, Formats.category AS formatCategory
                        FROM BooksFormats
                        JOIN Books ON Books.bookID = BooksFormats.bookID
                        JOIN Formats ON Formats.formatID = BooksFormats.formatID
                        ORDER BY bookFormatID`;
        const query9 = 'SELECT bookID, title FROM Books';
        const query10 = 'SELECT bookID, title FROM Formats';
        const [formats] = await db.query(query9);
        const [books] = await db.query(query9);
        const [booksformats] = await db.query(query8);
        
        res.render('booksformats', { booksformats, books, formats});
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});


// Citation for the following code:
// Date: 11/20/2025
// Adapted from: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25645149

// *************** CREATE SECTION Routes *************** //

// create route for Books
app.post('/books/create', async function (req, res) {
    try {
        // grab info from form
        let data = req.body;

        // Cofirm page count is an integer
        if (isNaN(parseInt(data.create_book_page_count))) {
            data.create_book_page_count = null;
        }
        if (isNaN(parseFloat(data.create_book_advance_amount))) {
            data.create_book_advance_amount = null;
        }

        // call query
        const query_book = `CALL sp_createBook(?, ?, ?, ?, @new_book_id);`;

        // 
        const [[[rows]]] = await db.query(query_book, [
            data.create_book_title,
            data.create_book_page_count,
            data.create_book_publish_date,
            data.create_book_advance_amount,
        ]);

        console.log(`Successfully Created Book Title: ${data.create_book_title}, Book ID: ${rows.new_book_id} `);

        // Redirect back to books
        res.redirect('/books');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});


// create route for Authors
app.post('/authors/create', async function (req, res) {
    try {
        // grab info from form
        let data = req.body;
        // call query
        const query_author = `CALL sp_createAuthor(?, ?, ?);`;

        
        const [[[rows]]] = await db.query(query_author, [
            data.create_author_fname,
            data.create_author_lname,
            data.create_author_email

        ]);
    
        // console.log(`Successfully Created Author: ${data.create_author_fname} ${data.create_author_lname}, Author ID: ${rows[0].new_author_id} `);

        // Redirect back to authors
        res.redirect('/authors');
    } catch (error) {
        console.error('Error creating authors:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while creating author.'
        );
    }
});

// create route for Buyers
app.post('/buyers/create', async function (req, res) {
    try {
        // grab info from form
        let data = req.body;

        // call query
        const query_buyer = `CALL sp_createBuyer(?, ?, ?, @new_buyer_id);`;

        // 
        const [[[rows]]] = await db.query(query_buyer, [
            data.create_buyer_name,
            data.create_buyer_email,
            data.create_buyer_organization_buyer,
        ]);

        console.log(`Successfully Created Buyer: ${data.create_buyer_name}, Buyer ID: ${rows.new_buyer_id} `);

        // Redirect back to books
        res.redirect('/buyers');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while adding to the buyers database queries.'
        );
    }
});

// create route for Formats
app.post('/formats/create', async function (req, res) {
    try {
        // grab info from form
        let data = req.body;

        // call query
        const query_format = `CALL sp_createFormat(?, ?, @new_format_id);`;

        // 
        const [[[rows]]] = await db.query(query_format, [
            data.create_format_category,
            data.create_format_royalty_percentage,
        ]);

        console.log(`Successfully Created Format: ${data.create_format_name}, Format ID: ${rows.new_format_id} `);

        // Redirect back to books
        res.redirect('/formats');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing adding to formats database queries.'
        );
    }
});

// create route for Orders
app.post('/orders/create', async function (req, res) {
    try {
        // grab info from form
        let data = req.body;

        // call query
        const query_order = `CALL sp_createOrder(?, ?, @new_order_id);`;

        // 
        const [[[rows]]] = await db.query(query_order, [
            data.create_order_buyer,
            data.create_order_date
        ]);

        console.log(`Successfully Created Order ID: ${rows.new_order_id} `);

        // Redirect back to orders
        res.redirect('/orders');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing adding to orders database queries.'
        );
    }
});

/// 
// create route for AuthorsBooks
app.post('/authorsbooks/create', async function (req, res) {
    try {
        // grab info from form
        let data = req.body;

        // call query
        const query = `CALL sp_createAuthorsBooks(?, ?, @new_author_book_id);`;

        // 
        const [[[rows]]] = await db.query(query, [
            data.create_author_id,
            data.create_book_id
        ]);

        console.log(`Successfully Created AuthorsBooks ID: ${rows.new_author_book_id} `);

        // Redirect back to orders
        res.redirect('/authorsbooks');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing adding to authorsbooks database queries.'
        );
    }
});


//// ******************* DELETE SECTION ******************* ////

// delete book
app.post('/books/delete', async function (req, res) {
    try {
        // grab info
        let data = req.body;
        // call query
        const query_del_book = `CALL sp_deleteBook(?);`;
        await db.query(query_del_book, [data.delete_book_id]);

        console.log(`Deleted ID: ${data.delete_book_id}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/books');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while deleting book using database queries.'
        );
    }
});
// Authors Delete Section
app.post('/authors/delete', async function (req, res) {
    try {
        // grab info
        let data = req.body;
        // call query
        const query_del_author = `CALL sp_deleteAuthor(?);`;
        await db.query(query_del_author, [data.delete_author_id]);

        console.log(`Deleted ID: ${data.delete_author_id}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/authors');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while deleting book using database queries.'
        );
    }
});

// Buyers Delete Section
app.post('/buyers/delete', async function (req, res) {
    try {
        // grab info
        let data = req.body;
        // call query
        const query_del_buyer = `CALL sp_deleteBuyer(?);`;
        await db.query(query_del_buyer, [data.delete_buyer_id]);

        console.log(`Deleted ID: ${data.delete_buyer_id}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/buyers');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while deleting buyer using database queries.'
        );
    }
});

// Formats Delete Section
app.post('/formats/delete', async function (req, res) {
    try {
        // grab info
        let data = req.body;
        // call query
        const query_del_format = `CALL sp_deleteFormat(?);`;
        await db.query(query_del_format, [data.delete_format_id]);

        console.log(`Deleted ID: ${data.delete_format_id}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/formats');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while deleting format using database queries.'
        );
    }
});

// Orders Delete Section
app.post('/orders/delete', async function (req, res) {
    try {
        // grab info
        let data = req.body;
        // call query
        const query_del_order = `CALL sp_deleteOrder(?);`;
        await db.query(query_del_order, [data.delete_order_id]);

        console.log(`Deleted ID: ${data.delete_order_id}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/orders');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while deleting order using database queries.'
        );
    }
});

// Authors Books Delete Section
app.post('/authorsbooks/delete', async function (req, res) {
    try {
        // grab info
        let data = req.body;
        // call query
        const query_del_auth_books = `CALL sp_deleteAuthorsBooks(?);`;
        await db.query(query_del_auth_books, [data.delete_author_book_id]);

        console.log(`Deleted ID: ${data.delete_author_book_id}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/authorsbooks');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while deleting authorsbooks using database queries.'
        );
    }
});


//// ************* UPDATE SECTION ******************** ////
// update books
app.post('/books/update', async function (req, res) {
    try {
        // get data from form
        const data = req.body;

        // check valid value entered 
        if (isNaN(parseInt(data.update_book_page_count))) {
            data.update_book_page_count = null;
        }
        if (isNaN(parseFloat(data.update_book_advance_amount))) {
            data.update_book_advance_amount = null;
        }

        const query1 = 'CALL sp_updateBooks(?, ?, ?, ?, ?);';
        await db.query(query1, [
            data.update_book_id,
            data.update_book_title,
            data.update_book_page_count,
            data.update_book_publish_date,
            data.update_book_advance_amount
        ]);

        res.redirect('/books');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while updating the books database queries.'
        );
    }
});
// Authors update
app.post('/authors/update', async function (req, res) {
    try {
        // get data from form
        const data = req.body;

        const query1 = 'CALL sp_updateAuthors(?, ?, ?, ?);';
        await db.query(query1, [
            data.update_author_id,
            data.update_author_first_name,
            data.update_author_last_name,
            data.update_author_email
        ]);

        res.redirect('/authors');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while updating the authors database queries.'
        );
    }
});

// Buyers update
app.post('/buyers/update', async function (req, res) {
    try {
        // get data from form
        const data = req.body;

        const query1 = 'CALL sp_updateBuyers(?, ?, ?, ?);';
        await db.query(query1, [
            data.update_buyer_id,
            data.update_buyer_name,
            data.update_buyer_email,
            data.update_buyer_organization_buyer
        ]);

        res.redirect('/buyers');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while updating the buyers database queries.'
        );
    }
});

// authorsbooks
app.post('/authorsbooks/update', async function (req, res) {
    try {
        // get data from form
        const data = req.body;

        // check valid
        if (isNaN(parseInt(data.update_author_id)))
            data.update_author_id = null;
        if (isNaN(parseInt(data.update_book_id)))
            data.update_book_id = null;

        const query1 = 'CALL sp_updateAuthorsBooks(?, ?, ?);';
        await db.query(query1, [
            data.update_author_book_id,
            data.update_author_id,
            data.update_book_id
        ]);

        res.redirect('/authorsbooks');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while updating the authorbooks database queries.'
        );
    }
});

// booksorders
app.post('/booksorders/update', async function (req, res) {
    try {
        // get data from form
        const data = req.body;

        // check valid
        if (isNaN(parseInt(data.update_book_id)))
            data.update_book_id = null;
        if (isNaN(parseInt(data.update_order_id)))
            data.update_order_id = null;
        if (isNaN(parseInt(data.update_book_quantity)))
            data.update_book_quantity = null;

        const query1 = 'CALL sp_updateBooksOrders(?, ?, ?, ?);';
        await db.query(query1, [
            data.update_book_order_id,
            data.update_book_id,
            data.update_order_id,
            data.update_book_quantity
        ]);

        res.redirect('/booksorders');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while updating the booksorders database queries.'
        );
    }
});

// booksformats
app.post('/booksformats/update', async function (req, res) {
    try {
        // get data from form
        const data = req.body;

        // check valid
        if (isNaN(parseInt(data.update_book_id)))
            data.update_book_id = null;
        if (isNaN(parseInt(data.update_format_id)))
            data.update_format_id = null;
        if (isNaN(parseFloat(data.update_price)))
            data.update_price = null;

        const query1 = 'CALL sp_updateBooksFormats(?, ?, ?, ?);';
        await db.query(query1, [
            data.update_book_format_id,
            data.update_book_id,
            data.update_format_id,
            data.update_price
        ]);

        res.redirect('/booksformats');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while updating the booksformats database queries.'
        );
    }
});

// Citation for use of AI Tools for edit authorsbooks:
// Date: 12/05/2025
// Prompts to determine how to prefill current values in edit view
// "how can I make it so that when user selects id values are preselected to show what the current value
//  before updating value?"
// included snippet of code
// adapted code
// AI Source URL: https://copilot.microsoft.com/


    
 





//// ************* RESET SECTION ******************** ////
app.post('/reset', async function (req, res) {
    try {
        const query_reset = `CALL sp_load_publisherdb();`;
        await db.query(query_reset)

        // Redirect the user to the updated webpage data
        res.redirect('/');
        

    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while reseting database.'
        );
    }
});



// ########################################
// ########## LISTENER
app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' +
            PORT +
            '; press Ctrl-C to terminate.'
    );
});


