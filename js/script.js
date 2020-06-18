$(document).ready(function () {

// BOOLZAPP

/*
MILESTONE 1
Step #1 - Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse;
Step #2 - Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando “invia” il testo viene aggiunto al thread sopra, come messaggio verde
*/


/*
MILESTONE 2
Step #3 - Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

Step #4 - Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite
*/


/*
MILESTONE 3
Step #5 -Click sul contatto mostra la conversazione del contatto cliccato, è possibile inserire nuovi messaggi per ogni conversazione

Step #6 - Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
*/









// ************************* FUNCTIONs *************************


// MILESTONE 1
// -------------------- Funzione invio messaggio --------------------

// Step #2 - Invio messaggio
//     ---> utente scrive un testo nella parte bassa (barra invio)
//e cliccando “invia” il testo viene aggiunto al thread sopra,
//come messaggio verde

// Creo evento click tramite tasto invio nella barra di ricerca
$('.send-input').click( function() {
  sendMsg();
});


// Funzione - clono e appendo messaggio
function sendMsg() {

  // Leggo e catturo input msg immesso in barra invio msg
  var msgText = $('.text-input').val();
  // console.log(msgText);

  if (msgText != ' ') {

    // Clono template del msg
    var newMsg = $('.template .msg-wrapper').clone();
    // console.log(newMsg);

    // Aggiungo testo del campo input
    newMsg.children('.msg-text').text(msgText);

    // Aggiungo classe relativa a msg inviato
    newMsg.addClass('chat msg-wrapper msg-sent-green');

    // Inserire orario corrente nel msg
    var date = new Date();
    var currentHours = date.getHours();
    var currentMinutes = date.getMinutes();
    var currentTime = currentHours + ':' + currentMinutes;
    newMsg.children('.msg-time').text(currentTime);

    // Appendo nuovo messaggio nella chat
    $('.chats').append(newMsg);
    // console.log(newMsg);

    // Reset campo input
    $('.text-input').val(' ');

    //Risposta generata automaticamente da pc dopo 1 secondo
    setTimeout(pcReplay, 1000);
  }
}



// MILESTONE 2
// -------------------- Funzione msg automatico pc --------------------
function pcReplay() {

    // Clono template msg automatico del pc
    var pcMsg = $('.template-pc p').clone();
    // console.log(newMsg);

    // Aggiungo testo del campo input
    pcMsg.children('.msg-text').text(pcMsg);

    // Aggiungo classe relativa a msg inviato
    pcMsg.addClass('chat msg-wrapper msg-received-white');

    // Appendo nuovo messaggio nella chat
    $('.chats').append(pcMsg);
    // console.log(newMsg);

    // Reset campo input
    $('.text-input').val(' ');
}



// -------------------- Funzione ricerca contatto in lista ------------------
// Alla pressione di un tasto nel campo barra di ricerca
$('.search-bar').keyup(function(event){

  //Leggo valore stringa immesso nella barra di ricerca
  var searchString = $('.search-input').val().toLowerCase();

  // Eseguo controllo di tutti i nominativi inseriti nella lista contatti
  $('.contacts-panel .contact').each(function(){
    var searchName = $(this).find('.contact-name').text().toLowerCase();

    //se c'è corrispondenza tra stringa digitata e nome contatto, allora mostro contatto
    if (searchName.includes(searchString)) {
      $(this).show();
    }
    //se non c'è corrispondenza tra stringa digitata e nome contatto, allora nascondo contatto
    else {
      $(this).hide();
    }
  });
});




// MILESTONE 3
// -------------------- Funzione mostra chat contatto cliccato --------------

// Creo evento click su contatto nella lista
$('.contact.box').click( function() {

  // var dataContact = $(this).attr('data-contact');
  // console.log(dataContact);  // ritorna n° data-contact corrispondente

  // Utente clicca su uno dei contatti in elenco,
  // in sezione chat dx appare la relativa conversazione associata (l'attr data-contact e data-chat collega il contatto con la sua chat)

  // Rimuovo la classe .active a elemento .contact.box corrente
  //     ---> di default a 1° elemento .contact.box (rende sfondo più scuro)
  $('.contact.box').removeClass('active');
  // Aggiungo la classe .active al contatto su cui ho cliccato
  $(this).addClass('active');

  // Prendo il valore di data-chat relativo al contatto su cui ho cliccato
  var dataChat = $(this).attr('data-chat');

  // Rimuovo la classe .chat-active a tutti gli elementi .chat per nascondere le chat
    //     ---> di default a 1° elemento .chat
  $('.chat').removeClass('chat-active');

  // Prendo l'elemento div contenente il msg  il cui attr data-chat corrisponde a quello del contatto cliccato e assegno classe .chat-active
  var generatedMsg = $('.chat [data-chat = " ' + dataChat + ' "]').addClass('chat-active');

  // Prendo il nome del contatto su cui ho cliccato
  var contactName = $(this).find('.contact-name').text();

  // Visualizzo  il nome del contatto in header dx
  $('.myprofile-right-header .user-name').text(contactName);

  // Prendo percorso file dell'img profilo del contatto su cui ho cliccato
  var contactImgPath = $(this).find('.icon-box img').attr('src');

  // Visualizzo img profilo del contatto cliccato in header dx tramite path
  $('.myprofile-right-header img').attr('src', contactImgPath);
});





// // -------------------- Funzione cancella msg chat --------------------
//
// // Creo evento click sull'icona del dropdown del msg
// $('.msg-wrapper').mouseenter( function() {
//
//
//
//   $(this).children('.hide span').removeClass('hide');
//   // Prendo il div .message-options relativo al msg su cui ho cliccato e aggiungo la classe .active per rendere visibile la finestra opzioni msg
//   // $(this).siblings('.message-options').toggleClass('active');
// });
































});  // document ready
