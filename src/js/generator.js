chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
	var longUrl = tabs[0].url; // from active tab
	var xmlhttp = new XMLHttpRequest();
	var url = 'https://www.googleapis.com/urlshortener/v1/url'; // goo.gl API
	var data = '{"longUrl":"'+longUrl+'"}'; // JSON
	xmlhttp.open('POST', url, true);
	xmlhttp.setRequestHeader('Content-type', 'application/json');
	xmlhttp.send(data);

	xmlhttp.onreadystatechange = function() { // waiting for short link
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { // success
			var response = JSON.parse(xmlhttp.responseText);
			document.getElementById('url').value = response.id;
			new QRCode(document.getElementById('qr'), { text: response.id, width: 128, height: 128 }); // generating QR by qrcode.js
			document.getElementById('qr').className = 'done'; // remove frame and loader
			document.getElementById('url').removeAttribute('readonly');
		} else document.getElementById('qr').className = 'error'; // smth went wrong
	}
});