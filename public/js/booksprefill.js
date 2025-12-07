    // page load event listener
    document.addEventListener("DOMContentLoaded", () => {
    
    //
    const selected = document.getElementById("update_book_id");
    const titleText = document.getElementById("update_book_title");
    const pageCountNum = document.getElementById("update_book_page_count");
    const publishDateNum = document.getElementById("update_book_publish_date");
    const advanceAmountNum = document.getElementById("update_book_advance_amount")

    // account for any missing values
    if (!selected || !titleText || !publishDateNum || !advanceAmountNum) {
        console.warn("Prefill missing elements.");
        return;
    }

    function prefill() {
        const option = selected.options[selected.selectedIndex];
        if (!option) return;

        const title = option.getAttribute("data-book-title");
        const pageCount = option.getAttribute("data-book-page");
        const publishDate = option.getAttribute("data-book-publishdate")
        const advanceAmount = option.getAttribute("data-book-advanceamount")

        // assign value already associated with book id
        if (title) titleText.value = title;
        if (pageCount) pageCountNum.value = pageCount;
        if (publishDate) publishDateNum.value = publishDate;
        if (advanceAmount) advanceAmountNum.value = advanceAmount;
    }

    // prefill immediately
    prefill();

    selected.addEventListener("change", prefill);
});