// Globale Variablen
const svgRemoveString = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M21 4h-3.1A5.009 5.009 0 0 0 13 0h-2a5.009 5.009 0 0 0-4.9 4H3a1 1 0 0 0 0 2h1v13a5.006 5.006 0 0 0 5 5h6a5.006 5.006 0 0 0 5-5V6h1a1 1 0 0 0 0-2ZM11 2h2a3.006 3.006 0 0 1 2.829 2H8.171A3.006 3.006 0 0 1 11 2Zm7 17a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V6h12Z" fill="red" opacity="1" data-original="#000000" class=""></path><path d="M10 18a1 1 0 0 0 1-1v-6a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1ZM14 18a1 1 0 0 0 1-1v-6a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z" fill="red" opacity="1" data-original="#ffffff" class=""></path></g></svg>`;
const svgDoneString = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M22.319 4.431 8.5 18.249a1 1 0 0 1-1.417 0L1.739 12.9a1 1 0 0 0-1.417 0 1 1 0 0 0 0 1.417l5.346 5.345a3.008 3.008 0 0 0 4.25 0L23.736 5.847a1 1 0 0 0 0-1.416 1 1 0 0 0-1.417 0Z" fill="lightgreen" opacity="1" data-original="#000000" class=""></path></g></svg>`; 

// Leertext für die abgeschlossenen Reisen
const abgeschlosseneReisenTabelle = document.getElementById('abgeschlossene-reisen-content');
const leerTextAbgeschlossen = document.createElement('p');
leerTextAbgeschlossen.innerHTML = 'Sie haben noch keine Reise abgeschlossen';
abgeschlosseneReisenTabelle.appendChild(leerTextAbgeschlossen);

// Leertext für die geplanten Reisen
const geplanteReisenTabelle = document.getElementById('Geplante-reisen-content');
const leerTextPlanen = document.createElement('p');
leerTextPlanen.innerHTML = 'Sie haben noch keine Reise geplant';
geplanteReisenTabelle.appendChild(leerTextPlanen);

// Styling für die Leertexte
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

// Uhrzeit sekündlich updaten
setInterval(updateDatum, 1000);

// Karten und Favoriten anzeigen
const wunschliste = document.querySelector('.wunschliste');
const wunschlisteBtn = document.querySelector('.wunschliste-svg');
const karte = document.querySelector('.karte');
const karteBtn = document.querySelector('.karte-svg');

// Wunschliste toggle
wunschlisteBtn.addEventListener('click', function() {
  wunschliste.classList.toggle('toggle');
  wunschlisteBtn.classList.toggle('toggle');
});

// Karte toggle
karteBtn.addEventListener('click', function() {
  karte.classList.toggle('toggle');
  karteBtn.classList.toggle('toggle');
});

// Reisen erstellen
document.getElementById('Reise-container-content').addEventListener('submit', function(event) {
  // Weiterleiten verhindern
  event.preventDefault();

  // Inputs an Variablen zuweisen
  const reiseNameInput = document.getElementById('Input-name').value;
  const reiseOrtInput = document.getElementById('Input-ort').value;
  const reiseStartDatumInput = document.getElementById('Input-start-datum').value;
  const reiseEndDatumInput = document.getElementById('Input-end-datum').value;
  const reisePrioritaetInput = document.getElementById('inputPriorität').value;

  // Outputs an Variablen zuweisen
  const reiseNameOutput = document.getElementById('Output-reisename');
  const reiseOrtOutput = document.getElementById('Output-reiseziel');
  const reiseDatumOutput = document.getElementById('Output-reisedatum');
  const reisePrioritaetOutput = document.getElementById('Output-priorität');

  // Input-Werte den Output-Werten zuweisen
  reiseNameOutput.value = reiseNameInput;
  reiseOrtOutput.value = reiseOrtInput;
  reiseDatumOutput.value = `${reiseStartDatumInput} - ${reiseEndDatumInput}`;
  reisePrioritaetOutput.value = reisePrioritaetInput;

  // Funktion, um ein neues Ziel zu erstellen
  function neuesZiel() {
    // Tabelle, wo die Elemente hinzugefügt werden, in einer Variable speichern
    const tabelle = document.getElementById('Reise-ziel-tabelle');
    const reihe = document.createElement('tr');

    // Table details erstellen
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const td6 = document.createElement('td');

    // Icons an Tabelle hinzufügen
    td5.innerHTML = svgDoneString;
    td6.innerHTML = svgRemoveString;

    // Outputs erstellen
    const output1 = document.createElement('Input');
    const output2 = document.createElement('Input');
    const output3 = document.createElement('Input');
    const output4 = document.createElement('Input');

    // Readonly an den Outputs anhängen
    output1.setAttribute('readonly', 'readonly');
    output2.setAttribute('readonly', 'readonly');
    output3.setAttribute('readonly', 'readonly');
    output4.setAttribute('readonly', 'readonly');

    // Outputs einen Wert zuweisen
    output1.value = reiseNameInput;
    output2.value = reiseOrtInput;
    output3.value = `${reiseStartDatumInput} - ${reiseEndDatumInput}`;
    output4.value = reisePrioritaetInput;

    // Outputs an den Details anhängen
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

    // Reihe an Tabelle anhängen
    tabelle.appendChild(reihe);

    // Geplante Reisen entfernen Knopf
    const svgRemove = td6.querySelector('svg');
    svgRemove.setAttribute('width', '20px');
    svgRemove.setAttribute('height', '20px');
    svgRemove.style.cursor = 'pointer';

    // Geplante Reisen abgeschlossen Knopf
    const svgDone = td5.querySelector('svg');
    svgDone.setAttribute('width', '20px');
    svgDone.setAttribute('height', '20px');
    svgDone.style.cursor = 'pointer';
    svgDone.style.margin = '2px';

    // Icons eine ID zuweisen
    td5.setAttribute('id', 'Done');
    td6.setAttribute('id', 'Remove');

    // If-Statement für den Leertext
    if (geplanteReisenTabelle.childNodes.length > 0) {
      leerTextPlanen.style.display = 'none';
    }

    // Funktion, um die Reiseziele in die abgeschlossene Tabelle hinzuzufügen
    function reisezielAbgeschlossen() {
      // Tabelle, wo die Elemente hinzugefügt werden, in einer Variable speichern
      const tabelleAbgeschlossen = document.getElementById('Abgeschlossene-reisen-tabelle');
      const reiheAbgeschlossen = document.createElement('tr');

      // Table details erstellen
      const tdAbgeschlossen1 = document.createElement('td');
      const tdAbgeschlossen2 = document.createElement('td');
      const tdAbgeschlossen3 = document.createElement('td');
      const tdAbgeschlossen4 = document.createElement('td');

      // Entfernen Knopf hinzufügen
      tdAbgeschlossen4.innerHTML = svgRemoveString;

      // Outputs erstellen
      const abgeschlossenOutput1 = document.createElement('Input');
      const abgeschlossenOutput2 = document.createElement('Input');
      const abgeschlossenOutput3 = document.createElement('Input');

      // Readonly als Attribut bei den Outputs festlegen
      abgeschlossenOutput1.setAttribute('readonly', 'readonly');
      abgeschlossenOutput2.setAttribute('readonly', 'readonly');
      abgeschlossenOutput3.setAttribute('readonly', 'readonly');

      // Outputs den Werten von geplanten Reisen zuweisen
      abgeschlossenOutput1.value = output1.value;
      abgeschlossenOutput2.value = output2.value;
      abgeschlossenOutput3.value = output3.value;

      // Outputs an den Details anhängen
      tdAbgeschlossen1.appendChild(abgeschlossenOutput1);
      tdAbgeschlossen2.appendChild(abgeschlossenOutput2);
      tdAbgeschlossen3.appendChild(abgeschlossenOutput3);

      // Details an Reihe anhängen
      reiheAbgeschlossen.appendChild(tdAbgeschlossen1);
      reiheAbgeschlossen.appendChild(tdAbgeschlossen2);
      reiheAbgeschlossen.appendChild(tdAbgeschlossen3);
      reiheAbgeschlossen.appendChild(tdAbgeschlossen4);

      // Reihe an Tabelle anhängen
      tabelleAbgeschlossen.appendChild(reiheAbgeschlossen);

      // Entfernen-Knopf eine ID zuweisen
      tdAbgeschlossen4.setAttribute('id', 'RemoveAbgeschlossen');
      const svgRemoveAbgeschlossen = tdAbgeschlossen4.querySelector('svg');
      svgRemoveAbgeschlossen.setAttribute('width', '20px');
      svgRemoveAbgeschlossen.setAttribute('height', '20px');
      svgRemoveAbgeschlossen.style.cursor = 'pointer';

      // Knopf, um abgeschlossene Fahrten zu entfernen
      tdAbgeschlossen4.addEventListener('click', function() {
        tabelleAbgeschlossen.removeChild(reiheAbgeschlossen);
      });

      // If-Statements für den Grauen Text, der angezeigt wird, wenn keine Reise abgeschlossen wurde
      if (tabelleAbgeschlossen.childNodes.length > 0) {
        leerTextAbgeschlossen.style.display = 'none';
      }
    }

    // Reiseziel als abgeschlossen markieren
    td5.addEventListener('click', function() {
      tabelle.removeChild(reihe);
      reisezielAbgeschlossen();
    });

    // Erstellte Reiseziele wieder löschen
    td6.addEventListener('click', function() {
      tabelle.removeChild(reihe);
    });
  }

  // Funktionen deklarieren
  function resetInput() {
    document.getElementById('Input-name').value = '';
    document.getElementById('Input-ort').value = '';
    document.getElementById('Input-start-datum').value = '';
    document.getElementById('Input-end-datum').value = '';
  }

  neuesZiel();
  resetInput();
});
