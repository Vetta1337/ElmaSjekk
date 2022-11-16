function getElma(url) {
    fetch(url)
        .then(function (response) {
            response.json().then(function (text) {
                storedText = text;
                console.log(storedText);
                done();
            });
        })
};

function done() {
    if (storedText.supportingEHF) {
        sEHF = "Ja";
        document.getElementById("result").style.color = "green";
    } else {
        sEHF = "Nei";
        document.getElementById("result").style.color = "red";
    };
    document.getElementById("result").innerText = 
        "Støtter EHF: " + sEHF;
    document.getElementById('annet').innerHTML =
        "Her er andre ting jeg har:" + "<br>" +
        "Orginasjon navn: " + storedText.organizationName + "<br>" +
        "Orginasjon nummer: " + storedText.organizationNumber + "<br>" +
        "Registrert dato: " + storedText.registredDate + "<br>" +
        "Støtter EHF: " + storedText.supportingEHF;
    


}

function updateOrgNr() {
    orgNr = document.getElementById("orgnr").value;
    console.log(orgNr);
    getElma("https://advisorws.advnet.no/Invoice/api/EHF/GetELMARecord?organizationNumber=" + orgNr);

}

window.onload = function () {
    document.querySelector("#orgnr").addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            updateOrgNr();
        }
    })
    document.addEventListener("keyup", function (event) {
        if (event.keyCode === 88) {
            getElma("https://advisorws.advnet.no/Invoice/api/EHF/GetELMARecord?organizationNumber=917869405");
        }
    });
}
