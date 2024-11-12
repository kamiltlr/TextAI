export async function callOpenAIAPI(prompt) {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('Brak klucza API. Sprawdź plik .env.');
    }

    const url = 'https://api.openai.com/v1/chat/completions';
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 150,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${errorText}`);
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const { choices } = await response.json();
    return choices?.[0]?.message?.content?.trim() || 'Brak odpowiedzi od modelu.';
  } catch (error) {
    console.error(`Błąd w callOpenAIAPI: ${error.message}`);
    throw new Error('Wystąpił problem podczas komunikacji z API OpenAI.');
  }
}