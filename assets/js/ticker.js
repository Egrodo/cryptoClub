// Custom Ticker by Noah Yamamoto

// Request top 10 coins by market cap and display them in order.
const reqTopCoins = () => {
	fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10')
	.then((res) => {
		if (res.ok) {
			return res.json();
		} else throw new Error('Coinmarketcap network not responding.');
	}).then((data) => {
			data.forEach((coin) => {
				display(coin);
			});
	}).catch(err => {
		console.error('There was a problem with the coin fetch: ' + err.message);
	});
};

const display = data => {
  // Compile stylized HTML elements with the data for each coin.
  let container = document.createElement('span');
    container.className = 'marquee';
  let name = document.createElement('span');
    name.innerHTML = data.name + ':';
    name.className = 'name';
    container.appendChild(name);
  let price = document.createElement('span');
    price.innerHTML = '$' + data.price_usd;
    price.className = 'price';
    container.appendChild(price);
  let change = document.createElement('span');
    change.innerHTML = data.percent_change_24h + '%';
    change.className = 'change';
    container.appendChild(change);

  if (change.innerHTML[0] == '-') {
    price.classList += ' negative arrow';
    change.classList += ' negative';
  } else {
    price.classList += ' positive arrow';
		change.classList += ' positive';
		change.innerHTML = '+' + change.innerHTML;
  }

  document.getElementById('ticker').appendChild(container);
};

reqTopCoins();