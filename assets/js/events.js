const eventsDiv = document.getElementById('eventbrite');
        
const formatISO8601 = datatime => {
    const date = new Date(datatime);
    return `${date.toDateString()} at ${date.getHours()}:${date.getMinutes()}`
}

const reqEvents = () => {
    fetch('https://www.eventbriteapi.com/v3/organizers/16490564531/events/?token=HG5VGOHTZXVMZUA36PYZ&order_by=start_desc')
    .then(res => {
		if (res.ok) {
			return res.json();
		} else throw new Error('Eventbrite is not responding.');
	}).then(data => {
        const events = data.events;
        console.log(events)

        eventsDiv.innerHTML = events.map( event => {
            const completed = event.status === 'completed' ? 'completed' : ''
            return `
                <div class="event ${completed}">
                <a href="${event.url}" target="_blank" style="border-bottom: none;">
                    <h3>${event.name.text}</h3>
                    <img src="${event.logo ? event.logo.url : null}" />
                </a>
                    <p class="${completed}">${formatISO8601(event.start.local)}</p>
                    <p>${event.description.text}</p>
                </div> 
            `;
        }).join('');
    })
}

reqEvents();
