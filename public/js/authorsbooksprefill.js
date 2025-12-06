    // Citation for use of AI Tools for edit authorsbooks:
    // Date: 12/05/2025
    // Prompts to determine how to prefill current values in dropdowns
    // "how can I make it so that when user selects id values are preselected to show what the current value
    //  before updating value?"
    // included snippet of code
    // adapted code
    // AI Source URL: https://copilot.microsoft.com/

    document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("update_author_book_id");
    const authorDropdown = document.getElementById("update_author_id");
    const bookDropdown = document.getElementById("update_book_id");

    select.addEventListener("change", () => {
        const option = select.options[select.selectedIndex];

        const authorID = option.getAttribute("data-author");
        const bookID = option.getAttribute("data-book");

        authorDropdown.value = authorID;
        bookDropdown.value = bookID;
    });
});
