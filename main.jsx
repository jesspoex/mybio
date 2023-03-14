import './style.css'
import { bech32 } from 'bech32'
import Mash from '@getmash/client-sdk'
import Buffer from 'buffer'
//import qrcode from 'qrcode-generator'
//import QrCreator from 'qr-creator'
import QRCode from 'qrcode'

/* Insert your info here! */
const earnerId = "welcome";
const portfolioURL = "https://webme.jesspoex.repl.co/";
const twitterURL = "https://mobile.twitter.com/jesspoex";
const githubURL = "https://github.com/jesspoex";
const replitURL = "https://instagram/jesspoex";

/* To change the profile pic, replace the profile-picture.png in the assets folder */

const mash = new Mash({ earnerID: earnerId})


mash.init({ id: earnerId, position: {
  
} }).then(() => {
  console.log("loaded")
})

let lightningAddress = ""; 




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
  <body style="margin: 0px; display: flex; height: 100%;">
  <span id="snackbar">Successfully Copied</span>
    <script type="module" src="script.js"></script>
    <script src="https://replit.com/public/js/replit-badge.js" defer>
    </script>
    <div style="height: 100%; background-size: cover;
 z-index: 1002; background-image: url('./assets/background.png');" id="container">
      <div id="fadeBackground">
      </div>
      <div id="headerContainer">
        <img src="./assets/uye.jpg" id="profilePicture">
        </img>
        <div id="name">jesspoex</div>
      </div>
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;">
           <a id="replit" target="_blank" style="cursor: pointer; margin: 9px" class="smallContainer">
          <img src="assets/ig.png" style="width:40px;height:40px";></img>
          <div class="boldFont">
            Instagram
          </div>
        </a>
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
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;" class="center largeContainer">
        <div class="donateCard">
          <div class="boldFont">
            Donate
          </div>
          <div style="text-align: center; font-family: Poppins; color: #404040;">
            buy my coffe.
            <a style="color: orange; text-decoration: underline;" target="_blank" href="#">SOL FnS6kKqCCLwMa5fr46atrD4pUPm5dJGt9Kk1P86TqQDp</a>
          </div>  
          </div>
          </button>
        </div>
      </div>
    </div>
  </body>
</html>
`

document.getElementById("portfolio").href = portfolioURL;
document.getElementById("twitter").href = twitterURL;
document.getElementById("github").href = githubURL;
document.getElementById("replit").href = replitURL;


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
navigator.clipboard.writeText(lightningAddress);
}

const QRCanvas = document.getElementById("qr-code");
QRCanvas.onclick = () => {
navigator.clipboard.writeText(`lightning:${encoded}`);
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