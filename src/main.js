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
  Jesteś AI, która generuje w pełni strukturalny kod HTML na podstawie treści artykułów. Na podstawie poniższej treści wygeneruj dokument HTML, który spełnia następujące wymagania:
  
  1. Zastosuj semantyczne znaczniki HTML, takie jak: <article>, <section>, <h1>, <h2>, <p>, aby odpowiednio ustrukturyzować całość artykułu.
  2. Wygenerowany kod HTML powinien być samodzielnym artykułem. **Pomiń tagi <html>, <head> oraz <body>**. Skup się wyłącznie na zawartości artykułu.
  3. Na początku artykułu użyj znacznika <article>, a w <section class="article-header"> umieść tytuł artykułu w znaczniku <h1>. Poniżej tytułu dodaj grafikę okładkową z użyciem struktury:
     <figure>
         <img src="image_placeholder.jpg" alt="Dokładny prompt do wygenerowania grafiki okładkowej, opisujący precyzyjnie jej zawartość w kontekście artykułu">
         <figcaption>Opisowy i czytelny podpis grafiki, np. "Sieci neuronowe w AI"</figcaption>
     </figure>.
  4. Każda sekcja artykułu <section class="article-section"> musi posiadać unikalny podtytuł w znaczniku <h2>, który wprowadza do tematu sekcji.
  5. W każdej sekcji umieść przynajmniej jedną grafikę. Wybierz odpowiednie miejsca w tekście i oznacz je w kodzie HTML. Dla każdej grafiki użyj struktury:
     <figure>
         <img src="image_placeholder.jpg" alt="Dokładny prompt do wygenerowania grafiki zgodnej z treścią sekcji, np. 'Zaawansowana sieć neuronowa analizująca dane'">
         <figcaption>Czytelny, konkretny podpis informujący o zawartości grafiki, np. "Model sieci neuronowej analizujący dane w czasie rzeczywistym"</figcaption>
     </figure>.
  6. **Dodaj szczegółowy prompt do atrybutu alt każdego obrazka**, który można użyć do wygenerowania tej grafiki.
  7. **Dostosuj podpisy pod grafikami** tak, aby były czytelne, opisowe i związane bezpośrednio z treścią obrazka, w prosty sposób wyjaśniając, co się na nim znajduje.
  8. Unikaj tworzenia nagłówków o bardzo podobnym brzmieniu. Każdy nagłówek i podtytuł powinien być unikalny i różnorodny.
  9. Automatycznie pogrubiaj wszystkie nazwy firm, aplikacji, znanych technologii oraz asystentów głosowych (np. <strong>ChatGPT</strong>, <strong>Spotify</strong>, <strong>Google</strong>, <strong>Siri</strong>, <strong>Google Assistant</strong>) używając tagu <strong> w celu wyróżnienia ich w treści.
  10. **W całości uwzględnij pełny tekst artykułu, bez pomijania lub skracania**. Nie stosuj wielokropków ("...") ani innych form skróconego tekstu.
  11. Kod HTML powinien być odpowiednio wcięty, zorganizowany i pozbawiony zbędnych elementów, aby był czytelny i łatwy do edycji.
  12. Generuj kod z myślą o najlepszej strukturze pod kątem dostępności i SEO.
  13. Na końcu artykułu zamknij znacznik <article>, a poniżej dodaj <section class="article-footer"> bez nagłówka, gdzie znajdą się dodatkowe informacje lub źródła związane z artykułem.
  14. Jeśli tekst artykułu jest długi, generuj kod etapami, aby uwzględnić pełny tekst.
  15. Poniżej znajduje się pełna treść artykułu, która **musi być całkowicie uwzględniona w kodzie HTML**:
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