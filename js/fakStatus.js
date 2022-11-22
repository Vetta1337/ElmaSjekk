var myHeaders = new Headers();
myHeaders.append("accept", "*/*");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify([
  "10003"
]);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};


function getElma(url) {
    fetch(url, requestOptions)
        .then(function (response) {
            response.json().then(function (text) {
                storedText = text;
                console.log(storedText);
                done();
            });
        })
};

function done() {
    console.log("OMG ITS DONE?! :O");
    let txt = "";
   //  for (let x in storedText) {
   //      txt += storedText[x] + " <br>";
   //      console.log("GOD HELP ME!!!");
   //  }
   document.getElementById("result").innerHTML = "<code>" + JSON.stringify(storedText) + "</code>";
};

getElma("https://advisorws.advnet.no/InvoiceTest/api/EHF/GetStatus?siteId=98000&userName=ehalvorsen&password=123Abc987");