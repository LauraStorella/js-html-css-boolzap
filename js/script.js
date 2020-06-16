$(document).ready(function () {

// BOOLZAPP

/*
Milestone 1
Step #1 - Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse;
Step #2 - Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando “invia” il testo viene aggiunto al thread sopra, come messaggio verde
*/


// Step #2 - Invio messaggio
//     ---> utente scrive un testo nella parte bassa (barra invio)
//e cliccando “invia” il testo viene aggiunto al thread sopra,
//come messaggio verde
sendMsg();






// ************************* FUNCTIONs *************************

// Funzione invio messaggio
function sendMsg() {

  var element = document.getElementById("send-input");
  element.addEventListener('click',
   function() {
     // Leggo valore immesso nella barra composizione msg
     var msgToSend = $('#send-msg-bar input').val();

     // Appendere msg in contenitore delle chat
    $('.chat').append(msgToSend);

     // Reset campo di input (stringa vuota)
    $('#send-msg-bar input').val("");
   }
  );
}









































});
