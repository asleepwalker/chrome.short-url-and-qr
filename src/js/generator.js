/*
*	Typographie extension for Google Chrome, v1.1
*	(c) 2014 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
*	https://github.com/asleepwalker/chrome.typographie
*/

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
	var longUrl = tabs[0].url; // from active tab
	var xmlhttp = new XMLHttpRequest();
	var url = 'https://www.googleapis.com/urlshortener/v1/url'; // goo.gl API
	var data = '{"longUrl":"'+longUrl+'"}';
	xmlhttp.open('POST', url, true);
	xmlhttp.setRequestHeader('Content-type', 'application/json');
	xmlhttp.send(data);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { // success
			var response = JSON.parse(xmlhttp.responseText);
			document.getElementById('url').value = response.id;
			new QRCode(document.getElementById('qr'), {
				text: response.id,
				width: 128,
				height: 128
			});
			document.getElementById('qr').className = 'done';
			document.getElementById('url').removeAttribute('readonly');
		}
		else document.getElementById('qr').className = 'error';
	};
});