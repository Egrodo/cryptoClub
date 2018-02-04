const retrieve = () => {
	fetch('https://api.rss2json.com/v1/api.json?api_key=4iwmzf0yryfd6ao88oqtqao8cxrwxrdefcutllj4&rss_url=https://medium.com/feed/@blockchainbaruch&count=1')
	.then(res => {
		if (res.ok) {
			return res.json();
		} else throw new Error('Connection to rss api failed.');
	}).then(data => {
		console.log(data);
		display(data);
	}).catch(err => {
		console.error('There was a problem with the fetch:' + err.message);
	});
};

const display = data => {
	let title = document.createElement('h1');
		title.innerHTML = data.items[0].title;
	let content = document.createElement('span');
		content.innerHTML = data.items[0].content;
		console.log(content);
	document.getElementById('title').appendChild(title);
	document.getElementById('display').appendChild(content);
};

retrieve();