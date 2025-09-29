# Motivera ditt val av databas

Jag har valt att använda MongoDB tillsammans med Mongoose. Anledningen till valet av databas är att jag först och främst vill se hur det är att jobba med en NoSQL databas, då jag redan gjort det med SQL. MongoDB passar bra för projektet eftersom datamodellen är relativt enkel och dokumentbaserad, vilket gör det smidigt att lagra uppgifter (Tasks) och användare (Users) utan strikt schema.

# Redogör vad de olika teknikerna (ex. verktyg, npm-paket, etc.) gör i applikationen

**express:** - Ramverk för att skapa REST-API:et och definiera routes, middleware och hantera HTTP-förfrågningar.

**mongoose** -	ODM för MongoDB; definierar scheman och modeller, hanterar validering och databaskommunikation.

**bcrypt** - Används för att hash:a lösenord innan de sparas i databasen.

**dotenv** - Hanterar miljövariabler, t.ex. databas-URL, från en .env-fil.

**jsonwebtoken (JWT)** - Används för autentisering. Skapar tokens som skickas med i cookies så att API:t kan veta vilken användare som är inloggad.

**cookie-parser** - Middleware för Express som läser in cookies från inkommande HTTP-förfrågningar.

**nodemon** - Utvecklingsverktyg som automatiskt startar om servern vid ändringar i koden.

**ts-node-dev** - Kör TypeScript direkt i Node.js under utveckling, med automatisk reload.

**typescript** - Typkontroll och moderna JavaScript-funktioner för säkrare och mer strukturerad kod.

**@types/\*** - Extra paket som gör att TypeScript "förstår" bibliotek som normalt inte har inbyggt stöd för typer.


# Redogör översiktligt hur applikationen fungerar


Trullo är en webbaserad applikation, där man kan skapa och hantera projekt, antingen själv eller tillsammans med ett team.

Detta är just nu bara ett backend projekt, jag kommer implementera en frontend framöver, samt lägga till ytterligare backend logik.

## Funktioner
### Användare

- **Registrering och inloggning** med email och/eller username.

- **Säker autentisering** med JWT och cookies.

- **Validering:**
    - Lösenord måste vara minst 8 tecken.
    - Email och username måste vara unika.

- **Hantera användarkonton** Skapa, läsa, uppdatera och ta bort användare

### Projekt

- **Skapa projekt:** Ange titel, beskrivning och medlemmar. Projektets skapare blir automatiskt admin över projektet.

- **Validering:**
    - Titel och beskrivning får inte vara tomma.

    - Unikt index title + admin förhindrar att samma admin skapar två projekt med samma titel.

- **Hantera medlemmar:** Admin kan lägga till eller ta bort medlemmar till/från projektet.

- **Hantera projekt** Skapa, läsa, uppdatera och ta bort projekt.

- **Åtkomstkontroll:** Bara admin och medlemmar kan se och uppdatera projekt.

### Uppgifter (tasks)

- **Skapa uppgifter** kopplade till ett projekt, med titel, beskrivning och tilldela den till en medlem i projektet.

- **Validering:** Titel och beskrivning krävs.

- **Uppgiftshantering:**

    - Uppdatera uppgifter såsom status.

    - När en uppgift markeras som klar (done), då sätts en tidsstämpel, samt vem som gjorde klart den.

    - Ta bort uppgifter från projekt.

- **Åtkomstkontroll:** Endast medlemmar i projektet kan se eller ändra uppgifter.

## Säkerhet & validering

- Alla endpoints är syddade med autentisering

- Lösenord sparas alltid krypterat med bcrypt, endast egna konton kan uppdateras och tas bort.

- MongoDB-index ser till att en användare inte kan ha flera projekt under samma namn.

# API Endpoints & Testdata

## USERS

### Create user
**POST** `/users/signup`
```json
{
  "username": "testuser",
  "email": "test@test.com",
  "password": "123456"
}
```

### Log in
**POST** `/users/login`
```json
{
  "username": "testuser",
  "password": "123456"
}
```

### Get users
**GET** `/users`

### Get user
**GET** `/users/:id`

### Update user
**PUT** `/users/:id`
```json
{
  "password": "testNewPassword"
}
```

### Delete user
**DELETE** `/users/:id`

## PROJECTS

### Create project
**POST** `/projects/create`
```json
{
  "title": "Project 1",
  "description": "This is a test"
}
```

### Get projects
**GET** `/projects`

### Get project
**GET** `/projects/:id`

### Update project
**PUT** `/projects/:id`
```json
{
  "description": "test description update"
}
```

// Om du har skapat två användare, lägg till en i projektet
```json
{
  "addMemberId": "<userId>"
}
```

// eller ta bort en från projektet
```json
{
  "removeMemberId": "<userId>"
}
```

### Delete project
**DELETE** `/projects/:id`

## TASKS

### Create task
**POST** `/projects/:projectId/tasks`
```json
{
  "title": "TaskTest",
  "description": "This is a test",
}
```

### Get tasks
**GET** `/projects/:projectId/tasks`

### Get task
**GET** `/projects/:projectId/tasks/:id`

### Update task
**PUT** `/projects/:projectId/tasks/:id`
```json
{
  "assignedTo": "<userId>",
  "status": "done"
}
```

### Delete task
**DELETE** `/projects/:projectId/tasks/:id`