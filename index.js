import accounts from './data.js'

const accountDisplay = document.getElementById('accounts-display')
const spendingEl = document.getElementById('spending-el')
const spendingDisplay = document.getElementById('spending-display')
const closeSpendingsBtn = document.getElementById('close-spendings')

closeSpendingsBtn.addEventListener('click', function() {
    spendingEl.style.display = 'none'
})

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
    const accountId = this.getAttribute('data-account-id');
    const accountData = accounts.find(account => account.id.toString() === accountId);
    const maxSpending = Math.max(...accountData.spendings.map(s => s.spent));
    const maxBarWidth = 300
    const minBarWidth = 200

    let spendingsHtmlContent = ``;
    
    if (accountData.spendings.length > 0) {
        spendingsHtmlContent += `<ul class='spending-graph'>`;
        for (let spending of accountData.spendings) {
            const barWidth = ((spending.spent / maxSpending) * maxBarWidth) + minBarWidth;
            spendingsHtmlContent += `
                <li class='spending-item' style='width: ${barWidth}px'>
                    <h4>${spending.category}:</h4>
                    <h4>$${spending.spent}</h4>
                </li>
            `
        }
        spendingsHtmlContent += '</ul>';

    } else {
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

