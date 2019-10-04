/*
* Short URL and QR-code generator for Google Chrome, v1.4
* (c) 2014–2019 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
* https://github.com/asleepwalker/chrome.short-url-and-qr
*/

chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
  const longUrl = tabs[0].url; // from active tab
  shortenUrl(longUrl)
    .then(showResult)
    .catch(showError);
});

async function shortenUrl(longUrl) {
  if (!/^https?:\/\//.test(longUrl)) {
    throw new Error('Invalid input URL');
  }

  const response = await fetch(`https://tinyurl.com/api-create.php?url=${longUrl}`);
  return response.text();
}

function showResult(shortUrl) {
  const qr = document.getElementById('qr');
  const input = document.getElementById('url');
  const msg = document.getElementById('msg');

  input.value = shortUrl;
  new QRCode(qr, {
    text: shortUrl,
    width: 128,
    height: 128
  });
  qr.className = 'done';

  // Copy to clipboard on input click
  input.parentElement.onclick = function() {
    input.select();
    if (document.execCommand('copy')) {
      msg.className = 'visible';
      setTimeout(() => { msg.className = '';  }, 2000);
    }
  }
}

function showError() {
  const qr = document.getElementById('qr');
  qr.className = 'error';
}
