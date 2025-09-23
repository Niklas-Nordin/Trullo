Motivera ditt val av databas
---

Jag har valt att använda MongoDB tillsammans med Mongoose. Anledningen till valet av databas är att jag först och främst vill se hur det är att jobba med en NoSQL databas, då jag redan gjort det med SQL. MongoDB passar bra för projektet eftersom datamodellen är relativt enkel och dokumentbaserad, vilket gör det smidigt att lagra uppgifter (Tasks) och användare (Users) utan strikt schema.


Redogör vad de olika teknikerna (ex. verktyg, npm-paket, etc.) gör i applikationen
---

**express:** - Ramverk för att skapa REST-API:et och definiera routes, middleware och hantera HTTP-förfrågningar.

**mongoose** -	ODM för MongoDB; definierar scheman och modeller, hanterar validering och databaskommunikation.

**bcrypt** -	Används för att hash:a lösenord innan de sparas i databasen.

**dotenv** -	Hanterar miljövariabler, t.ex. databas-URL, från en .env-fil.

**nodemon** - 	Utvecklingsverktyg som automatiskt startar om servern vid ändringar i koden.

**ts-node-dev** -	Kör TypeScript direkt i Node.js under utveckling, med automatisk reload.

**typescript** -	Typkontroll och moderna JavaScript-funktioner för säkrare och mer strukturerad kod.



Redogör översiktligt hur applikationen fungerar
---

