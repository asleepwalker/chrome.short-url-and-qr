chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
	var longUrl = tabs[0].url;
	var xmlhttp = new XMLHttpRequest();
	var url = 'https://www.googleapis.com/urlshortener/v1/url';
	var data = '{"longUrl":"'+longUrl+'"}';
	xmlhttp.open('POST', url, true);
	xmlhttp.setRequestHeader('Content-type', 'application/json');
	xmlhttp.send(data);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = JSON.parse(xmlhttp.responseText);
			document.getElementById('url').value = response.id;
			new QRCode(document.getElementById('qr'), { text: response.id, width: 128, height: 128 });
		}
	}
});