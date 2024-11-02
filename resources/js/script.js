// SVG-Icons für entfernen und abschließen
const svgRemoveString = ` <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M21 4h-3.1A5.009 5.009 0 0 0 13 0h-2a5.009 5.009 0 0 0-4.9 4H3a1 1 0 0 0 0 2h1v13a5.006 5.006 0 0 0 5 5h6a5.006 5.006 0 0 0 5-5V6h1a1 1 0 0 0 0-2ZM11 2h2a3.006 3.006 0 0 1 2.829 2H8.171A3.006 3.006 0 0 1 11 2Zm7 17a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V6h12Z" fill="red" opacity="1" data-original="#000000" class=""></path><path d="M10 18a1 1 0 0 0 1-1v-6a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1ZM14 18a1 1 0 0 0 1-1v-6a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z" fill="red" opacity="1" data-original="#ffffff" class=""></path></g></svg>`;
const svgDoneString = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M22.319 4.431 8.5 18.249a1 1 0 0 1-1.417 0L1.739 12.9a1 1 0 0 0-1.417 0 1 1 0 0 0 0 1.417l5.346 5.345a3.008 3.008 0 0 0 4.25 0L23.736 5.847a1 1 0 0 0 0-1.416 1 1 0 0 0-1.417 0Z" fill="lightgreen" opacity="1" data-original="#000000" class=""></path></g></svg>`;

// Leertexte für die geplanten und abgeschlossenen Reisen
const abgeschlosseneReisenTabelle = document.getElementById('abgeschlossene-reisen-content');
const leerTextAbgeschlossen = document.createElement('p');
leerTextAbgeschlossen.innerHTML = 'Sie haben noch keine Reise abgeschlossen';
abgeschlosseneReisenTabelle.appendChild(leerTextAbgeschlossen);

const geplanteReisenTabelle = document.getElementById('Geplante-reisen-content');
const leerTextPlanen = document.createElement('p');
leerTextPlanen.innerHTML = 'Sie haben noch keine Reise geplant';
geplanteReisenTabelle.appendChild(leerTextPlanen);

// Styling für Leertexte
const leerTextStyle = {
    opacity: '0.3',
    fontSize: '12px',
    textAlign: 'center',
    marginTop: '15px'
};
Object.assign(leerTextPlanen.style, leerTextStyle);
Object.assign(leerTextAbgeschlossen.style, leerTextStyle);

// Datum und Uhrzeit anzeigen
const Uhrzeit = document.getElementById("Uhrzeit");
const Datum = document.getElementById("Datum");

function updateDatum() {
  const jetzigesDatum = new Date();
  Datum.textContent = jetzigesDatum.toLocaleDateString();
  Uhrzeit.textContent = jetzigesDatum.toLocaleTimeString();
}
setInterval(updateDatum, 1000);

// Geplante und abgeschlossene Reisen Arrays
let geplanteReisen = JSON.parse(localStorage.getItem('geplanteReisen')) || [];
let abgeschlosseneReisen = JSON.parse(localStorage.getItem('abgeschlosseneReisen')) || [];

// Funktion zum Speichern in Local Storage
function saveToLocalStorage() {
    localStorage.setItem('geplanteReisen', JSON.stringify(geplanteReisen));
    localStorage.setItem('abgeschlosseneReisen', JSON.stringify(abgeschlosseneReisen));
}

// Reisen aus Local Storage laden
function loadReisen() {
    geplanteReisen.forEach((reise) => addReiseToTable(reise, false));
    abgeschlosseneReisen.forEach((reise) => addReiseToTable(reise, true));
    updateLeertext();
}

// Funktion, um Reise zur Tabelle hinzuzufügen
function addReiseToTable(reise, abgeschlossen) {
    const tabelle = abgeschlossen ? document.getElementById('Abgeschlossene-reisen-tabelle') : document.getElementById('Reise-ziel-tabelle');
    const reihe = document.createElement('tr');

    // Table Details
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const td6 = document.createElement('td');

    // Icons für Aktionen
    td5.innerHTML = svgDoneString;
    td6.innerHTML = svgRemoveString;

    // Outputs erstellen
    const output1 = document.createElement('Input');
    const output2 = document.createElement('Input');
    const output3 = document.createElement('Input');
    const output4 = document.createElement('Input');

    // Readonly an Outputs
    output1.setAttribute('readonly', 'readonly');
    output2.setAttribute('readonly', 'readonly');
    output3.setAttribute('readonly', 'readonly');
    output4.setAttribute('readonly', 'readonly');

    // Werte zuweisen
    output1.value = reise.name;
    output2.value = reise.ort;
    output3.value = `${reise.startDatum} - ${reise.endDatum}`;
    output4.value = reise.prioritaet;

    // Outputs an Details anhängen
    td1.appendChild(output1);
    td2.appendChild(output2);
    td3.appendChild(output3);
    td4.appendChild(output4);

    // Details an Reihe anhängen
    reihe.appendChild(td1);
    reihe.appendChild(td2);
    reihe.appendChild(td3);
    reihe.appendChild(td4);
    reihe.appendChild(td5);
    reihe.appendChild(td6);

    // Reihe zur Tabelle hinzufügen
    tabelle.appendChild(reihe);

    // Buttons für Aktionen
    const svgRemove = td6.querySelector('svg');
    svgRemove.setAttribute('width', '20px');
    svgRemove.setAttribute('height', '20px');
    svgRemove.style.cursor = 'pointer';
    const svgDone = td5.querySelector('svg');
    svgDone.setAttribute('width', '20px');
    svgDone.setAttribute('height', '20px');
    svgDone.style.cursor = 'pointer';

    // Abgeschlossen-Knopf
    if (!abgeschlossen) {
        td5.addEventListener('click', function() {
            tabelle.removeChild(reihe);
            abgeschlosseneReisen.push(reise);
            geplanteReisen = geplanteReisen.filter((r) => r !== reise);
            saveToLocalStorage();
            addReiseToTable(reise, true);
            updateLeertext();
        });
    }

    // Entfernen-Knopf
    td6.addEventListener('click', function() {
        tabelle.removeChild(reihe);
        if (abgeschlossen) {
            abgeschlosseneReisen = abgeschlosseneReisen.filter((r) => r !== reise);
        } else {
            geplanteReisen = geplanteReisen.filter((r) => r !== reise);
        }
        saveToLocalStorage();
        updateLeertext();
    });
}

// Form verarbeiten
document.getElementById('Reise-container-content').addEventListener('submit', function(event) {
    event.preventDefault();

    const reise = {
        name: document.getElementById('Input-name').value,
        ort: document.getElementById('Input-ort').value,
        startDatum: document.getElementById('Input-start-datum').value,
        endDatum: document.getElementById('Input-end-datum').value,
        prioritaet: document.getElementById('inputPriorität').value,
    };

    geplanteReisen.push(reise);
    saveToLocalStorage();
    addReiseToTable(reise, false);
    updateLeertext();

    // Eingabefelder zurücksetzen
    document.getElementById('Input-name').value = '';
    document.getElementById('Input-ort').value = '';
    document.getElementById('Input-start-datum').value = '';
    document.getElementById('Input-end-datum').value = '';
});

// Leertexte anzeigen oder verstecken
function updateLeertext() {
    leerTextPlanen.style.display = geplanteReisen.length ? 'none' : 'block';
    leerTextAbgeschlossen.style.display = abgeschlosseneReisen.length ? 'none' : 'block';
}

// Daten beim Laden der Seite wiederherstellen
loadReisen();
