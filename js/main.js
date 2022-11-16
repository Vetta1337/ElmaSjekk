function getElma(url) {
    fetch(url)
        .then(function (response) {
            response.text().then(function (text) {
                storedText = text;
                done();
            });
        })
};

function done() {
    document.getElementById('result').innerHTML =
        "Her er det jeg har:" + "<br>" + storedText;
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
    });
}