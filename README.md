# Flight Radar

In questa applicazione, usando le informazioni prese con l'API dal sito di [aviationstack.com](https://aviationstack.com/), vado a mostrare un'interfaccia in cui è possibile visualizzare quelle stesse informazioni.

## Funzionamento
In primo luogo, l'utente viene indirizzato nella pagina di `Home` in cui si presenta un semplice form in cui occorre inserire il codice del volo da cercare.
In particolare, a livello ufficiale, il valore da inserire è quello che in aviazione viene definito `flight iata`.

A quel punto, se in la `REST API` possiede le informazioni, vengono mostrate con una UI moderna nella pagina apposita.
Se si vuole cercare un altro volo, è possibile tornare alla pagina `Home` tramite il pulsante apposito.

## Installazione
Per installare l'applicazione, occorre clonare da github il pacchetto di codice. Aprire la repository in un IDE qualsiasi ed eseguire il comando:

```bash
pnpm i
```

Per installare la varie dipendenze.

Oltre a questo, occorre avere un account per sviluppatori (anche gratuito) sul sito di [avitationstack.com](https://aviationstack.com/) e in un file d'ambiente `.env` valorizzare la variabile `AVIATION_KEY` con il valore della propria `key`che viene fornita sul sito.

## Avvio dell'applicazione
A questo punto, a terminare eseguire il comando:

```bash
pnpm dev
```

Per far eseguire il programma sul browser solitamente alla link [localhost:3000](http://localhost:3000).