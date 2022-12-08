import './style.css'
import { bech32 } from 'bech32'
import Mash from '@getmash/client-sdk'
import Buffer from 'buffer'
//import qrcode from 'qrcode-generator'
//import QrCreator from 'qr-creator'
import QRCode from 'qrcode'

/* Insert your info here! */
const earnerId = "e18bc0b3-c295-4ccd-b585-00e542a13b01";
const portfolioURL = "https://www.getmash.com/donations/";
const twitterURL = "https://mobile.twitter.com/getmash";
const githubURL = "https://github.com/getmash/mash-js";
/* To change the profile pic, replace the profile-picture.png in the assets folder */

const mash = new Mash({ earnerID: earnerId})


mash.init({ id: earnerId, position: {
  
} }).then(() => {
  console.log("loaded")
})

let lightningAddress = ""; 

fetch(`https://api.getmash.com/earners/${earnerId}`).then((response) => {
  return response.json();
}).then((earner) => { 
  
  lightningAddress = earner.handle + "@getmash.cash";
  document.getElementById("lightningAddressText").innerHTML = lightningAddress;
})

function encodeLNURL(url) {
  return bech32.encode("lnurl", bech32.toWords(Buffer.Buffer.from(url, "utf8")), 1023).toUpperCase();
}

const encoded = encodeLNURL(`https://api.getmash.com/lnurlp/earners/${earnerId}/invoice`);


document.querySelector('#app').innerHTML = `
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Mash Donation Page
    </title>
    <link href="style.css" rel="stylesheet" type="text/css" />
   
  </head>
  <body style="margin: 0px; display: flex">
  <span id="snackbar">Successfully Copied</span>
    <script type="module" src="script.js"></script>
    <script src="https://replit.com/public/js/replit-badge.js" defer>
    </script>
    <div style="background-size: cover; z-index: 1002; background-image: url('./assets/background.png');" id="container">
      <div id="fadeBackground">
      </div>
      <div id="headerContainer">
        <img src="./assets/profile-picture.png" id="profilePicture">
        </img>
        <div id="name">John Smith</div>
      </div>
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;">
        <a id="portfolio" target="_blank" style="cursor: pointer; margin: 9px" class="smallContainer">
          <img src="assets/portfolio-icon.svg"></img>
          <div class="boldFont">
            My Portfolio
          </div>
        </a>
        <a id="twitter" target="_blank" style="margin: 9px; cursor: pointer;" class="smallContainer">
          <img src="assets/twitter-icon.svg"></img>
          <div class="boldFont">
            Twitter
          </div>
        </a>
        <a id="github" target="_blank" style="cursor: pointer; margin: 9px" class="smallContainer">
          <img src="assets/github-icon.svg"></img>
          <div class="boldFont">
            GitHub
          </div>
        </a>
      </div>
      <div class="mediumContainer">
      <a target="_blank" href="lightning:${encoded}">
        <canvas style="z-index: 1000; margin-right: 18px;" id="barcode"></canvas>
      </a>
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div class="boldFont">
            Support with LNURL-Pay
          </div>
          <div style="font-family: Poppins; color: #404040; max-width: 524px; margin-bottom: 10px">
            Scan this QR code with another supported Lightning Wallet to contribute to John Smith. You can also support by
            sending funds via the Lightning Address below with a supported lightning wallet. <a style="color: #DD87DA" target="_blank" href="https://lightningaddress.com/">Learn more</a>
          </div>
          <div id="lightningAddress">
            <img src="./assets/lightning-icon.svg" />
            <div id="lightning-address" style="font-family: Poppins; color: #404040;">
              <div id="lightningAddressText"></div>
            </div>
            <img id="copy-icon" style="margin-left: auto; cursor: pointer;" src="assets/copy-icon.svg" />
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;" class="largeContainer">
        <div class="donateCard">
          <div class="boldFont">
            Donate
          </div>
          <div style="text-align: center; font-family: Poppins; color: #404040;">
            Send a donation using your Mash wallet. <a style="color: #DD87DA" target="_blank" href="https://www.getmash.com/faq-wallet">Learn more</a>
          </div>
          <button style="cursor: pointer;" id="donateButton" handle=window.EarnerHandle mode="all" button-size="md">
          <img src="assets/donate.svg">
          </img>
          <div style="color: #FFD7FD; font-family: Spartan; font-size: 22px; font-weight: 700; line-height: 26px;">
          Donate
          </div>
          </button>
        </div>
        <div class="donateCard">
          <div class="boldFont">
            Send a Boost
          </div>
          <div style="text-align: center; font-family: Poppins; color: #404040;">
            Send a donation using your Mash wallet. <a style="color: #DD87DA" target="_blank" href="https://www.getmash.com/faq-wallet">Learn more</a>
          </div>
          <mash-boost-button icon="heart" layout-mode="inline" display-mode="with-text" color-variant="colorized"
            size="md" mobile-size="sm"></mash-boost-button>
        </div>
      </div>
    </div>
  </body>
</html>
`

document.getElementById("portfolio").href = portfolioURL;
document.getElementById("twitter").href = twitterURL;
document.getElementById("github").href = githubURL;

QRCode.toCanvas(document.getElementById('barcode'), encoded, function (error) {
    if (error) console.error(error)
    console.log('success!');
  })

const donate = document.getElementById("donateButton");
donate.onclick = () => {
  mash.donate();
}

const copy = document.getElementById("copy-icon");
copy.onclick = () => {
navigator.clipboard.writeText("mash-dino-game@getmash.cash");
}

function sendMessage() {
    let message =  chatInput.value
    window.alert(message)
    chatInput.value = "";
}

const sendButton = document.querySelector('#snackbar')
sendButton.addEventListener('click', sendMessage)

//document.getElementById("portfolio").style.display = "none";
//document.getElementById("twitter").style.display = "none";
//document.getElementById("github").style.display = "none";