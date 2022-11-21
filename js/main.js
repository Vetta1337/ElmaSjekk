var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

var linkElma = "https://advisorws.advnet.no/InvoiceTest/api/EHF/GetELMARecord?organizationNumber=";
var version = "0.1.3.0";


document.title = "EHF Sjekker v" + version;


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

function fetchUrl(url) {
    fetch(url)
        .then(function (response) {
            storedResponse = response.text();
            console.log(storedResponse);
        });
}

function done() {
    if (storedText.supportingEHF) {
        sEHF = "Ja";
        document.getElementById("result").style.color = "#38ef7d";
        document.getElementById('annet').innerHTML =
            "<strong>Annen informasjon som er hentet:</strong>" + "<br>" +
            "Organisasjon's navn: " + storedText.organizationName + "<br>" +
            "Organisasjon's nummer: " + storedText.organizationNumber + "<br>" +
            "Registrert dato: " + storedText.registredDate + "<br>";
    } else {
        sEHF = "Nei";
        document.getElementById("result").style.color = "red";
        document.getElementById("annet").innerHTML =
            "Organisasjon nummer: " + storedText.organizationNumber;
    };
    document.getElementById("result").innerHTML =
        "Støtter EHF: " + sEHF;
}

function clearDone() {
    document.getElementById("result").style.color = "white";
    document.getElementById("result").innerHTML = "Søker...";
    document.getElementById("annet").innerHTML = "";
    document.getElementById("orgnr").style.color = "white";
};

function updateOrgNr() {
    clearDone();
    orgNr = document.getElementById("orgnr").value;
    orgNr = orgNr.toString().replace(/\s/g, '');
    console.log(orgNr);
    console.log(orgNr.length);
    if (orgNr.length == 9) {
        console.log(orgNr);
        getElma(linkElma + orgNr);
        console.log(orgNr.length);
        document.getElementById("feilMeldinger").innerHTML = "";
    } else {
        document.getElementById("orgnr").style.color = "red";
        console.log("Ugyldig organisasjonsnummer");
        document.getElementById("feilMeldinger").style.color = "red";
        document.getElementById("feilMeldinger").innerHTML =
            "Feil:" + "<br>" +
            "Ugyldig organisasjonsnummer og/eller feil format" + "<br>" +
            "Skriv inn organisasjonsnummeret med 9 siffer";
        document.getElementById("result").style.color = "lightred";
        document.getElementById("result").innerHTML = "Noe gikk galt... :("; 
    };
}

window.onload = function () {
    document.querySelector("#orgnr").addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            updateOrgNr();
        }
    })
    document.addEventListener("keyup", function (event) {
        if (event.keyCode === 88) {
            document.getElementById("orgnr").value = "917869405";
            updateOrgNr();
        } else if (event.keyCode === 90) {
            document.getElementById("orgnr").value = "91786940";
            updateOrgNr();
        }
    });
}