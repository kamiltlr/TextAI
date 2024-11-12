import { callOpenAIAPI } from './script.js';

const fileInput = document.getElementById('fileInput');
const textContent = document.getElementById('textContent');
const sendToOpenAI = document.getElementById('sendToOpenAI');
const responseElement = document.getElementById('response');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && file.type === 'text/plain') {
    const reader = new FileReader();
    reader.onload = (e) => {
      textContent.value = e.target.result;
    };
    reader.readAsText(file);
  } else {
    alert('Proszę wczytać plik tekstowy (.txt).');
  }
});

sendToOpenAI.addEventListener('click', async () => {
  const prompt = textContent.value.trim();
  if (!prompt) {
    alert('Proszę wczytać plik tekstowy lub wpisać tekst.');
    return;
  }

  try {
    responseElement.textContent = 'Ładowanie...';
    const response = await callOpenAIAPI(prompt);
    responseElement.textContent = `Odpowiedź OpenAI:\n${response}`;
  } catch (error) {
    responseElement.textContent = `Błąd: ${error.message}`;
  }
});