
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
app.engine('.hbs', engine({ extname: '.hbs' })); // Create instance of handlebars
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
        const query1 = 'SELECT * FROM Books';
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
        const query9 = 'SELECT buyerID, firstName, lastName FROM Buyers';
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
        // submit query
        const query6 = 'SELECT * FROM AuthorsBooks';
        const [authorsbooks] = await db.query(query6);
        res.render('authorsbooks', { authorsbooks: authorsbooks});
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
        const query7 = 'SELECT * FROM BooksOrders';
        const [booksorders] = await db.query(query7);
        res.render('booksorders', { booksorders: booksorders});
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
        const query8 = 'SELECT * FROM BooksFormats';
        const [booksformats] = await db.query(query8);
        res.render('booksformats', { booksformats: booksformats});
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
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