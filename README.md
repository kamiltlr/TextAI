Aplikacja do Przetwarzania Artykułów z OpenAI

Opis działania aplikacji
Aplikacja umożliwia przetwarzanie plików tekstowych (.txt) z artykułami przy pomocy API OpenAI. Wczytany artykuł jest przesyłany do modelu językowego, który generuje na jego podstawie ustrukturyzowany kod HTML, spełniający konkretne wymagania, w tym:
- Semantyczna struktura z odpowiednimi tagami HTML.
- Oznaczenia miejsc na grafiki z opisowym atrybutem alt.
- Automatyczne pogrubienie nazw technologii, aplikacji i firm.
- Wygenerowany kod HTML, który jest zapisywany do pliku artykul.html, jest gotowy do dalszej edycji lub publikacji.

Funkcje aplikacji
- Wczytywanie pliku tekstowego: Użytkownik może załadować plik .txt z artykułem do przetworzenia.
- Generowanie kodu HTML: Treść artykułu jest przetwarzana przez OpenAI i zwracana jako sformatowany kod HTML.
- Oznaczenia miejsc na grafiki: Wygenerowany kod HTML zawiera tagi <img src="image_placeholder.jpg"> z atrybutem alt, który można wykorzystać do wygenerowania grafik.
- Automatyczne formatowanie nazw: Znane nazwy firm, aplikacji i technologii są pogrubiane w kodzie HTML.

Instrukcja uruchomienia
Wymagania:
- Node.js
- Klucz API OpenAI zapisany w pliku .env

Instrukcja krok po kroku
Klonowanie repozytorium:
git clone <URL_repozytorium>
cd <nazwa_folderu>

Instalacja zależności: Użyj menedżera pakietów npm do zainstalowania wymaganych bibliotek:
npm install

Ustawienie klucza API
Utwórz plik .env w katalogu głównym aplikacji i dodaj swój klucz API OpenAI:
VITE_OPENAI_API_KEY=Twój_Klucz_API

Uruchomienie aplikacji
Uruchom aplikację lokalnie za pomocą serwera deweloperskiego:
npm run dev

Domyślnie aplikacja zostanie uruchomiona pod adresem http://localhost:3000.

Użycie aplikacji
1. Otwórz stronę w przeglądarce i załaduj plik .txt z artykułem.
2. Kliknij przycisk „Przetwórz artykuł”, aby wysłać treść do OpenAI.
3. Po zakończeniu przetwarzania kliknij odpowiedni przycisk, aby zapisać wygenerowany plik HTML.

Struktura plików
index.html – Prosty interfejs użytkownika do ładowania pliku i interakcji z aplikacją.
src/main.js – Główny skrypt odpowiedzialny za wczytywanie pliku, tworzenie promptu i przetwarzanie odpowiedzi z OpenAI.
src/script.js – Skrypt odpowiedzialny za komunikację z API OpenAI.
public/artykul.html – Plik generowany po przetworzeniu artykułu, gotowy do pobrania.
public/szablon.html – Pusty szablon HTML do podglądu artykułu. Zawiera tylko podstawową strukturę HTML, w której użytkownik może wkleić kod artykułu w sekcji <body>.
public/podglad.html – Plik zawierający artykuł w pełnej wersji (na podstawie pliku public/artykul.html), przygotowany do zaprezentowania w przeglądarce.
public/styles/style.css - Podstawowy arkusz stylów CSS, odpowiadający za bazowe formatowanie i wygląd plików szablon.html oraz podglad.html.

Uwagi
Upewnij się, że klucz API OpenAI jest aktywny i poprawnie zapisany w pliku .env.
Aplikacja wymaga połączenia z internetem, aby wysłać zapytanie do API OpenAI.
Wygenerowany plik artykul.html nie zawiera stylów CSS ani JavaScript.
