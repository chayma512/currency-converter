document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.getElementById('convertButton');
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const resultDisplay = document.getElementById('result');

    // Remplir les options de devises
    const currencies = ['USD', 'EUR', 'GBP', 'TND', 'JPY'];
    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrency.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrency.appendChild(optionTo);
    });

    convertButton.addEventListener('click', () => {
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;
        if (amount && from && to) {
            fetch(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`)
                .then(response => response.json())
                .then(data => {
                    const rate = data.rates[to];
                    const result = amount * rate;
                    resultDisplay.textContent = `Résultat : ${result.toFixed(2)} ${to}`;
                })
                .catch(error => console.error('Erreur:', error));
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    });
});
  