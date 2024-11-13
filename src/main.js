import { callOpenAIAPI } from './script.js';

const fileInput = document.getElementById('fileInput');
const sendToOpenAI = document.getElementById('sendToOpenAI');
const responseElement = document.getElementById('response');
const saveToFile = document.getElementById('saveToFile');
let fileContent = '';

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && file.type === 'text/plain') {
    const reader = new FileReader();
    reader.onload = (e) => {
      fileContent = e.target.result;
      responseElement.textContent = 'Plik wczytany pomyślnie. Kliknij "Przetwórz artykuł".';
    };
    reader.readAsText(file);
  } else {
    alert('Proszę wczytać plik tekstowy (.txt).');
  }
});

sendToOpenAI.addEventListener('click', async () => {
  if (!fileContent) {
    alert('Najpierw wczytaj plik tekstowy.');
    return;
  }

  const prompt = `
Jesteś AI, która generuje wysoce zorganizowany i semantyczny kod HTML na podstawie treści artykułów. Na podstawie poniższej treści wygeneruj dokument HTML, który spełnia następujące wymagania:

1. Zastosuj semantyczne znaczniki HTML, w tym: <article>, <section>, <header>, <footer>, <h1>, <h2>, <p>.
2. Każda sekcja artykułu powinna być wyraźnie oddzielona i otagowana odpowiednim znacznikiem <section> dla lepszej organizacji treści.
3. W miejscach przeznaczonych na grafiki użyj struktury: <figure><img src="image_placeholder.jpg" alt="prompt do grafiki"><figcaption>Podpis grafiki</figcaption></figure>, aby podkreślić kontekst grafiki i zapewnić zgodność ze standardami dostępności.
4. Kod HTML powinien zawierać wyłącznie zawartość między <body> i </body> bez dodatkowych sekcji, CSS ani JavaScript.
5. Zapewnij, że kod HTML jest odpowiednio wcięty, zorganizowany i pozbawiony zbędnych elementów, by ułatwić jego czytelność i edycję.
6. Generuj kod z myślą o możliwie najlepszej strukturze pod kątem dostępności i SEO.
7. Poniżej znajduje się treść artykułu:
${fileContent}
`;

  try {
    responseElement.textContent = 'Ładowanie...';
    const rawResponse = await callOpenAIAPI(prompt);
    const cleanedHTML = extractBodyContent(rawResponse); 
    responseElement.textContent = 'Artykuł przetworzony pomyślnie. Możesz go zapisać jako HTML.';
    saveGeneratedHTML(cleanedHTML);
  } catch (error) {
    responseElement.textContent = `Błąd: ${error.message}`;
  }
});

function saveGeneratedHTML(htmlContent) {
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'artykul.html'; 
  a.click();

  URL.revokeObjectURL(url); 
}

function extractBodyContent(html) {
  const bodyStart = html.indexOf('<body>');
  const bodyEnd = html.indexOf('</body>');
  return bodyStart !== -1 && bodyEnd !== -1
    ? html.slice(bodyStart + 6, bodyEnd).trim()
    : html.replace(/<\/?(html|head|body)[^>]*>/gi, '').trim();
}