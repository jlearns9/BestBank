import accounts from './data.js'

const accountDisplay = document.getElementById('accounts-display')
const spendingEl = document.getElementById('spending-el')
const spendingDisplay = document.getElementById('spending-display')

function displayAccountInformation() {
    accountDisplay.innerHTML = '';
    let htmlContent = '';

    for (let i = 0; i < accounts.length; i++) {
        let accountType = accounts[i].title;
        let accountBalance = accounts[i].balance;
        htmlContent += `
            <li class='account-info' data-account-id='${accounts[i].id}'>
                <h3>${accountType}</h3>
                <h3>$ ${accountBalance}</h3>
            </li>
        `;
    }
    accountDisplay.innerHTML = htmlContent;

    const accountElements = document.querySelectorAll('.account-info');

    accountElements.forEach(elemnet => {
        elemnet.addEventListener('click', displayAccountSpending);
    });
}
displayAccountInformation()

function displayAccountSpending() {
    // Get the account id from the data attribute of the clicked element
    const accountId = this.getAttribute('data-account-id');

    // Find the account data using the account id
    const accountData = accounts.find(account => account.id.toString() === accountId);

    // Determine the max spending to set the scale of the graph
    const maxSpending = Math.max(...accountData.spendings.map(s => s.spent));

    // Initialize an HTML string for the spendings
    let spendingsHtmlContent = ``;

    // Check if there are spendings to display
    if (accountData.spendings.length > 0) {
        // Define a maximum width for a bar in the graph
        const maxBarWidth = 300; // in pixels
        const minBarWidth = 200

        // Start an unordered list to display the spendings
        spendingsHtmlContent += `<ul class='spending-graph'>`;

        // Iterate over the spendings and create list items
        for (let spending of accountData.spendings) {
            // Calculate the width of the bar
            const barWidth = ((spending.spent / maxSpending) * maxBarWidth) + minBarWidth;

            spendingsHtmlContent += `
                <li class='spending-item' style='width: ${barWidth}px'>
                    <h4>${spending.category}:</h4>
                    <h4>$${spending.spent}</h4>
                </li>
            `
        }

        // Close the unordered list
        spendingsHtmlContent += '</ul>';

    } else {
        // If there are no spendings, display a message
        spendingsHtmlContent += `
                <ul class='spending-graph'>
                    <li class='spending-item' style='width: 500px'>
                        <h4>No Spending Available</h4>
                    </li>
                </ul>
            `;
    }
    
    spendingDisplay.innerHTML = spendingsHtmlContent
    spendingEl.style.display = 'block'
}

