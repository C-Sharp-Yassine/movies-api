# Movies API

REST API för filmer byggt med Node.js, Express och SQLite.

## Beskrivning

Ett API för att hantera filmer med möjlighet att skapa, hämta, uppdatera och radera filmer samt filtrera filmer efter genre.

## Tekniker

- Node.js
- Express
- SQLite
- better-sqlite3
- Supertest
- Node.js test runner

## Kom igång

### Installera beroenden

```bash
pnpm install
```

### Starta API:t

```bash
pnpm start 
```

API:t körs på http://localhost:3000

### Kör tester

```bash
pnpm test
```

## Databasdesign

Tabellen movies innehåller:

| Fält     | Typ     | Beskrivning    |
|----------|---------|--------------- |  
| id       | INTEGER | Unikt ID       |
| title    | TEXT	   | Filmens titel  |
| genre	   | TEXT	   | Filmens genre  |
| year	   | INTEGER | Utgivningsår   |
| director | TEXT	   | Regissör       |

## Endpoints

| Metod  | URL                      | Beskrivning                 |
|--------|--------------------------|-----------------------------|
| POST   | /api/movies              | Skapa en film               |
| GET    | /api/movies              | Hämta alla filmer           |
| GET    | /api/movies?genre=Action | Filtrera filmer efter genre |
| PUT    | /api/movies/:id          | Uppdatera en film           |
| DELETE | /api/movies/:id          | Radera en film              |

## Felhantering

API:t returnerar:

- `404 Not Found` när en film inte finns vid uppdatering eller radering.
- `500 Internal Server Error` om ett databasfel uppstår.

## Tester

Tester finns för:
- skapa film
- hämta filmer
- filtrera filmer efter genre
- uppdatera film
- radera film