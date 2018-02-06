// Custom Medium posts Retriever by Noah Yamamoto

// Uses rss2json to request rss feed from Medium and display it properly.
const retrieve = () => {
	fetch('https://api.rss2json.com/v1/api.json?api_key=4iwmzf0yryfd6ao88oqtqao8cxrwxrdefcutllj4&rss_url=https://medium.com/feed/@blockchainbaruch&count=3')
	.then(res => {
		if (res.ok) {
			return res.json();
		} else throw new Error('Connection to rss api failed.');
	}).then(posts => {
		blogDisp(posts);
	}).catch(err => {
		console.error('There was a problem with the fetch:' + err.message);
	});
};

const blogDisp = posts => {
	// For each postss, display it.
	for (let i = 0; i < posts.items.length; i++) {
		let display = document.createElement('div');
		let title = document.createElement('h3');
		let date = document.createElement('h5');
		let content = document.createElement('div');
		title.innerHTML = posts.items[i].title;
		date.innerHTML = `<p>By: <a href="https://medium.com/@Blockchainbaruch">${posts.items[i].author}</a> <br> ${posts.items[i].pubDate.substr(0,posts.items[i].pubDate.indexOf(' '))}</p>`;
		content.innerHTML = posts.items[i].content;
		display.append(title, date, content);
		document.getElementById('blog').appendChild(display);
	}
};

retrieve();