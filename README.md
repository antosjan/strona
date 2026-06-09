# Portfolio

Aktualna glowna wersja portfolio jest publikowana z `index.html` i korzysta z plikow:

- `editorial.css`
- `editorial.js`
- `editorial-data.js`
- `portfolio/images`

Plik `editorial.html` zostal zostawiony jako prosty alias przekierowujacy na strone glowna.

## Co edytowac

Najwazniejszy plik do tresci to `editorial-data.js`. Tam zmienisz:

- dane osobowe i linki
- hero i branding
- opis `About`
- edukacje
- projekty
- design
- fotografie

## Folder `portfolio`

- `portfolio/images` - zdjecia, mockupy i grafiki
- `portfolio/projects` - dodatkowe materialy do projektow

## CV i linki

- LinkedIn i GitHub sa pobierane z `personal.linkedin` i `personal.github`
- przycisk CV korzysta z `personal.cvFile`
- jesli dodasz plik PDF do katalogu glownego, mozesz ustawic np. `cvFile: "Jan-Antos-CV.pdf"`

## Uruchomienie lokalnie

Mozesz otworzyc `index.html` bezposrednio w przegladarce albo odpalic prosty serwer:

```powershell
python -m http.server 8080
```

Potem otworz `http://localhost:8080`.

## GitHub Pages

Najprostsza publikacja:

1. wrzuc repozytorium na GitHub
2. w repo przejdz do `Settings` -> `Pages`
3. ustaw publikacje z branch `main` i folder `/root`
4. po chwili strona bedzie dostepna pod adresem GitHub Pages
