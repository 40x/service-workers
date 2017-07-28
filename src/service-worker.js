self.addEventListener('push', function(event) {
	if (event.data) {

		const promiseChain = fetch('http://mocker.egen.io/users')
			.then(function(resp) {
				return resp.json();
			})
			.then(function(data) {
				return self.registration.showNotification(data[0].email + event.data.text(), {
					body: 'This is hardcoded body! - ' +  Math.random(),
					icon: '/assets/angular-js.png',
					requireInteraction: true,
					actions: [
						{
							action: 'show-more',
							title: 'Show More'
						},
						{
							action: 'ignore',
							title: 'Ignore'
						}
					]
				});
			});

		event.waitUntil(promiseChain);

	} else {
		console.log('This push event has no data.');
	}
});


self.addEventListener('notificationclick', function(event) {
	console.dir(event);

	// for android -> use with badge
	event.notification.close();

	event.waitUntil(
		clients.matchAll({
			type: "window"
		})
			.then(function(clientList) {
				for (var i = 0; i < clientList.length; i++) {
					var client = clientList[i];
					if (client.url == 'http://localhost:4200/' && 'focus' in client)
						return client.focus();
				}
				if (clients.openWindow) {
					return clients.openWindow('localhost:4200');
				}
			})
	);
});