//PARTE PER LA BARRA LATERALE
function openNav() {
  document.getElementById('sidebar').style.width = "250px";
}

function closeNav() {
  document.getElementById('sidebar').style.width = "0";
}

const btnopensbar = document.getElementById('openbtn');
btnopensbar.addEventListener('click', openNav);

const btnclosebar = document.getElementById('closebtn');
btnclosebar.addEventListener('click', closeNav);

// PARTE PER LE API
// API di https://api.coingecko.com/api/v3 (senza chiave)
function onJson (json) {
  lblock.innerHTML = json['lucky-block'].eur;
  btc.innerHTML = json.bitcoin.eur;
  binc.innerHTML = json.binancecoin.eur;
  doge.innerHTML = json.dogecoin.eur;
  eth.innerHTML = json.ethereum.eur;
}

function onResponse (response) {
  return response.json();
}

function onError(error) {
  console.log ('Errore: ' + error);
}

const lblock = document.getElementById('luckyblock');
const btc = document.getElementById('bitcoin');
const binc = document.getElementById('binancecoin');
const doge = document.getElementById('dogecoin');
const eth = document.getElementById('ethereum');

fetch('https://api.coingecko.com/api/v3/simple/price?ids=lucky-block%2Cbitcoin%2Cbinancecoin%2Cdogecoin%2Cethereum&vs_currencies=eur').then(onResponse, onError).then(onJson);


//API di https://api.coinranking.com/v2 (con chiave)
function onJson2 (json) {
  console.log(json);
  let coinsData = json.data.coins;

  if (coinsData.length > 0) {
    var cryptoCoin = "";
  }
  coinsData.forEach((coin) => {
    cryptoCoin += "<tr>";
    cryptoCoin += `<td> ${coin.btcPrice} </td>`;
    cryptoCoin += `<td> ${coin.rank}</td>`;
    cryptoCoin += `<td> ${coin.tier} </td>`;
    cryptoCoin += `<td> ${coin.name}</td>`;
    cryptoCoin += `<td><img class="coins" src='${coin.iconUrl}'></td>`;
    cryptoCoin += `<td> $${Math.round(coin.price)} Miliardi</td>`;
    cryptoCoin += `<td> ${coin.symbol}</td>`;"</tr>";
  });
  document.getElementById("data").innerHTML = cryptoCoin;
}

function onResponse2(response) {
  return response.json();
}

function onError2(error) {
  console.log ('Errore: ' + error);
}

function Buttontoggle()
{
  let table = document.querySelector('.table');
  if (table.classList.contains('hidden')) {
    table.classList.remove('hidden');
    morebtn.innerHTML = "Nascondi dettagli"
  } else {
    table.classList.add('hidden');
    morebtn.innerHTML = "Mostra altri dettagli e altre cryptovalute";
  }
}

const baseUrl = "https://api.coinranking.com/v2/coins";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiKey = "coinranking0ae558a2f295332b97b6f92f2253eb88fd26d1bd03739dda";
const morebtn = document.querySelector('.more');
morebtn.addEventListener('click', Buttontoggle);

fetch(proxyUrl + baseUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-My-Custom-Header': apiKey,
      'Access-Control-Allow-Origin': "*"
    }
}).then(onResponse2, onError2).then(onJson2);


//API di https://api.unsplash.com/ (con chiave)

const endpoint = 'https://api.unsplash.com/';
const key = 'xYBM5FMVQoQbe-TPXuIQACrDIOTIILT4Frva1hfFAxs';
const secret = 'c-ToQrO9g8Hgb7wnFo9bL8eOVRpPyJYrL0WhKz6P0X0';

function apriModale(event) {
	const image = document.createElement('img');
	image.id = 'immagine';
	image.src = event.currentTarget.src;
	modale.appendChild(image);
	modale.classList.remove('hidden');
	document.body.classList.add('no-scroll');
}


function chiudiModale(event) {
  if (event.target == modale) {
    modale.classList.add('hidden');
		img = modale.querySelector('img');
		img.remove();
		document.body.classList.remove('no-scroll');
  }
}

function onJson3(json) {
  const library = document.querySelector('#album-view');
  // per clearare nel caso di risultati precedenti
  library.innerHTML = '';

  const results = json.results;

  for(let result of results) {
    const imageUrl = result.urls.regular;
    const album = document.createElement('div');
    album.classList.add('album');
    const img = document.createElement('img');
    img.src = imageUrl;

    img.addEventListener('click', apriModale);
    album.appendChild(img);
    library.appendChild(album);
  }
}

function onResponse3(response) {
  return response.json();
}

function onError3(error) {
  console.log ('Errore: ' + error);
}

function search(event) {
	event.preventDefault();
	// Leggo il valore del campo di testo
	const content = document.querySelector('#content').value;
	// Verifico che ci sia del testo
	if(content) {
	    const text = encodeURIComponent(content);

      // Eseguo fetch
			let img_request = endpoint + '/search' + '/photos' + '?query='  + text + '&client_id=' + key;
			fetch(img_request).then(onResponse3).then(onJson3);
  } else {
		alert("Per effettuare la ricerca inserisci del TESTO");
	}
}

//Aggiungo event listener al form1 per la RICERCA
const form = document.querySelector('#search');
form.addEventListener('submit', search);

//Aggiungo event listener alla finestra per la chiusura della modale
const modale = document.querySelector('#modale');
window.addEventListener('click', chiudiModale);


//API di Unsplash (con OAuth2.0)

const oauth2 = 'https://unsplash.com/oauth/';
const authendp = 'https://unsplash.com/oauth/authorize';
const tokenendp = 'https://unsplash.com/oauth/token';
const redirect = 'http://localhost/mhw3/mhw3.html';
var accesstoken = '';

function onJson4(json) {
  const library = document.querySelector('#album-view2');
  // per clearare nel caso di risultati precedenti
  library.innerHTML = '';

  const results = json.results;

  for(let result of results) {
    const imageUrl = result.urls.regular;
    const album = document.createElement('div');
    album.classList.add('album');
    const img = document.createElement('img');
    img.src = imageUrl;

    img.addEventListener('click', apriModale);
    album.appendChild(img);
    library.appendChild(album);
  }
}

function onResponse4(response) {
  return response.json();
}

function onError4(error) {
  console.log ('Errore: ' + error);
}

function search2(event) {
	event.preventDefault();
	// Leggo il valore del campo di testo
	const content2 = document.querySelector('#content2').value;
	// Verifico che ci sia del testo
	if(content2) {
    const text = encodeURIComponent(content2);

    let img_request = endpoint + '/search' + '/photos' + '?query='  + text + '&client_id=' + key;

    /*//1. fase di autenticazione (oauth2) (nel caso in cui avessi avuto un redirect uri valido)
    //redirecting...
    const redurl = 'https://unsplash.com/oauth/authorize?client_id=' + key + '&redirect_uri=' + redidrect + '&response_type=code&scope=public';

    window.location.href = redurl;

    const req = 'https://unsplash.com/oauth/authorize' + '?client_id=' + key + '&redirect_uri=' + redirect + '&response_type=' + 'code' + '&scope=' + 'public';
    fetch(proxyUrl + req, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(onResponse4).then(onJson4);

    const authcode = window.location.href.split('='); //esempio di risposta (a noi serve il token che sta dopo l'=) https://unsplash.com/oauth/authorize/native?code = JBS3NvsqGNv33Rd2DSdgSNa261bI5eZh5KPBbJ0mqfw
	*/
	//3. Effettuo richiesta POST parametrizzata a https://unsplash.com/oauth/token:
    fetch(tokenendp, {
      method: 'POST',
      client_id: key,
      client_secret: secret,
      redirect_uri: redirect,
      code: 'x0Vo-zB4IcIrhjbMmBvIpBH3d2whNJaNYdy5ck8OFoQ',  //token preso a mano (in quanto il redirect uri non puo essere localhost per unsplash) dalla pagina di gestione dell'applicazione per ottenere l'accesso
      grant_type: 'authorization_code'
    }).then(onTokenResponse).then(getToken);

    function onTokenResponse (response) {
      return response.json();
    }

    function getToken(json) {
	    accesstoken = json.accesstoken;
    }
	
    //Una volta ottenuta l'autorizzazione (token) lo usiamo per effettuare la richiesta
    fetch(img_request, {
				headers: {
					'Authorization': 'Bearer' + accesstoken
				}
			}).then(onResponse4).then(onJson4);
  } else {
		alert("Per effettuare la ricerca inserisci del TESTO");
	}
}

//Aggiungo event listener al form2 per la RICERCA
const form2 = document.querySelector('#search2');
form2.addEventListener('submit', search2);


//API di spotify (con OAuth2)

const client_id = 'eaef06146b544c8594e09fdb71dff232';
const client_secret = 'f9c6da6569414fe8b3edebc6e027d60c';
const spotifytokenendp = 'https://accounts.spotify.com//api/token';
const spotifysearchendp = 'https://api.spotify.com/v1/search';
let text = '';

function onToken (json) {
  console.log(json);
  token = json.access_token;
  return token;
}

function onJson5(json) {
  console.log(json);
  const tracce = document.querySelector('#track-view');

  tracce.innerHTML = '';  // per clearare nel caso di risultati precedenti

  const tracks = json.tracks.items;

  for(track of tracks) {
    const brano = track.external_urls.spotify;
    const traccia = document.createElement('a');
    traccia.href = brano;
    traccia.innerHTML=track.name;

    tracce.appendChild(traccia);
  }
}

function onResponse5(response) {
  return response.json();
}

function onError5(error) {
  console.log ('Errore: ' + error);
}

function spotifyAuth(event){   //richiesta del token
  event.preventDefault();

	const content3 = document.querySelector('#content3').value;

	if(content3) {
    text = encodeURIComponent(content3);

    fetch(proxyUrl + spotifytokenendp,
    {
        method:"POST",
        body:'grant_type=client_credentials',
        headers:
        {
            'Authorization':'Basic ' + btoa(client_id+":"+client_secret),
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }).then(onResponse5, onError5).then(onToken).then(spotifySearch);
  }
}

function spotifySearch (token) {
  if (token) {  //verifico che il token non sia null
    let track_request = spotifysearchendp + '?q=' + text + '&type=track' + '&market=IT&limit=5&offset=1';
    
    fetch(track_request, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(onResponse5, onError5).then(onJson5);
  }
}

//Aggiungo event listener al form3 per la RICERCA
const form3 = document.querySelector('#search3');
form3.addEventListener('submit', spotifyAuth);