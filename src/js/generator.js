/*
*	Short URL and QR-code generator for Google Chrome, v1.3
*	(c) 2014–2017 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
*	https://github.com/asleepwalker/chrome.short-url-and-qr
*/

chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
	var longUrl = tabs[0].url; // from active tab
	var xmlhttp = new XMLHttpRequest();
	var url = 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCJc796c9LKjvtqIOmE7C06VW30yvfawQc';
	var data = '{"longUrl":"' + longUrl + '"}';
	xmlhttp.open('POST', url, true);
	xmlhttp.setRequestHeader('Content-type', 'application/json');
	xmlhttp.send(data);

	xmlhttp.onreadystatechange = function() {
		var qr = document.getElementById('qr');
		var input = document.getElementById('url');
		var msg = document.getElementById('msg');
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = JSON.parse(xmlhttp.responseText);
			input.value = response.id;
			new QRCode(qr, {
				text: response.id,
				width: 128,
				height: 128
			});
			qr.className = 'done';

			input.parentElement.onclick = function() {
				input.select();
				if (document.execCommand('copy')) {
					msg.className = 'visible';
					setTimeout(function() {
						msg.className = '';
					}, 2000);
				}
			};
		} else {
			qr.className = 'error';
		}
	};
});
