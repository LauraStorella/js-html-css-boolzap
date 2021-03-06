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

// Creo evento click tramite tasto invio nella barra invio msg
$('.btn-send-msg').click( function() {
  sendMsg();
});


// -------------------- Funzione modifica tasto invio-msg  --------------------
$('.send-msg-bar input').focus( function() {
  $('.btn-send-msg i').removeClass('fa-microphone').addClass('fa-paper-plane');
});

$('.send-msg-bar input').blur( function() {
  $('.btn-send-msg i').removeClass('fa-paper-plane').addClass('fa-microphone');
});


// -------------------- Funzione pressione tasto invio in input per invio msg  --------------------
$('.send-msg-bar input').keypress( function() {
  if( event.which === 13 || event.keyCode === 13) {
    sendMsg();
  }
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
    newMsg.addClass('msg-sent-green');

    // Inserire orario corrente nel msg
    var date = new Date();
    var currentHours = date.getHours();
    var currentMinutes = date.getMinutes();
    var currentTime = addZeroToTime(currentHours) + ':' + addZeroToTime(currentMinutes);
    newMsg.children('.msg-time').text(currentTime);

    // Appendo nuovo messaggio nella chat
    $('.chat.chat-active').append(newMsg);
    // console.log(newMsg);

    // Scrollbar a fine finestra chat
    // $('.chats').scrollTop($('.chats').height());
    $('.chats').scrollTop($('.chats').prop('scrollHeight'));

    // Reset campo input
    $('.text-input').val(' ');

    //Risposta generata automaticamente da pc dopo 1 secondo
    setTimeout(pcReplay, 1000);
  }
}


// Funzione per aggiungere 0 a orario se numero < 10
//   ---> numero : numero
function addZeroToTime(number) {
    if ( number < 10) {
      return '0' + number;
    }
    return number
}


// MILESTONE 2
// -------------------- Funzione msg automatico pc --------------------
function pcReplay() {

  // Clono template del msg
  var newMsg = $('.template .msg-wrapper').clone();
  // console.log(newMsg);

  // Aggiungo testo del campo input
  newMsg.children('.msg-text').text('OK!');

  // Aggiungo classe relativa a msg inviato
  newMsg.addClass('msg-received-white');

  // Inserire orario corrente nel msg
  var date = new Date();
  var currentHours = date.getHours();
  var currentMinutes = date.getMinutes();
  var currentTime = addZeroToTime(currentHours) + ':' + addZeroToTime(currentMinutes);
  newMsg.children('.msg-time').text(currentTime);

  // Appendo nuovo messaggio nella chat
  $('.chat.chat-active').append(newMsg);
  // console.log(newMsg);

  // Scrollbar a fine finestra chat
  // $('.chats').scrollTop($('.chats').height());
  $('.chats').scrollTop($('.chats').prop('scrollHeight'));
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
  var dataChat = $(this).attr('data-contact');

  // Rimuovo la classe .chat-active a tutti gli elementi .chat per nascondere le chat
    //     ---> di default a 1° elemento è .chat-active
  $('.chat').removeClass('chat-active');

  // Prendo l'elemento div contenente il msg  il cui attr data-chat corrisponde a quello del contatto cliccato e assegno classe .chat-active
  var generatedMsg = $('.chat[data-chat = "' + dataChat + '"]').addClass('chat-active');

  // Prendo il nome del contatto su cui ho cliccato
  var contactName = $(this).find('.contact-name').text();

  // Visualizzo  il nome del contatto in header dx
  $('.myprofile-right-header .user-name').text(contactName);

  // Prendo percorso file dell'img profilo del contatto su cui ho cliccato
  var contactImgPath = $(this).find('.icon-box img').attr('src');

  // Visualizzo img profilo del contatto cliccato in header dx tramite path
  $('.myprofile-right-header img').attr('src', contactImgPath);
});





// // -------------------- Funzione cancella msg chat  con ToggleClass --------------------
//
// // Creo evento click sull'icona del dropdown del msg
// $(document).on('mouseenter', '.chat', function() {
//
//   // Visualizzo icona arrow che apre dropdown menu
//   $(this).find('.arrow').removeClass('hide');
// });
//
//
// // Creo evento click sull'icona del dropdown del msg
// $(document).on('mouseleave', '.chat', function() {
//
//   // Scompare icona arrow del dropdown menu
//   $(this).find('.arrow').addClass('hide');
// });
//
//
// // Creo evento  click su icona dropdown menu
// $(document).on('click', '.arrow', function() {
//
//   // alert('test');
//
//   // al click su icona dropdown menu,
//   // visualizzo/nascondo il dropdown menu
//   $(this).nextAll('.message-options').toggleClass('hide');
// });
//
//
// // Creo evento click su voce dropdown menu per cancellare msg
// //    ---> click on voce "canc msg" (classe .message-delete)
// //    ---> rimuovo msg associato a specifico dropdown con (this)
// // parto da elemento cliccato, risalgo il DOM, individuo elemento con classe ".msg-wrapper" che è il contenitore del msg
// $(document).on('click', '.message-delete', function() {
//   $(this).closest('.msg-wrapper').remove();
// });
//
//
// // Creo evento click sull'icona del dropdown del msg
// $(document).on('mouseleave', '.message-options', function() {
//
//   // Scompare icona arrow del dropdown menu
//   $(this).addClass('hide');
// });



// ------------ Funzione cancella msg chat con Add/Remove Class & ToggleClass -----------

// Creo evento click sull'icona del dropdown del msg
$(document).on('mouseenter', '.chat', function() {
  // Visualizzo icona arrow che apre dropdown menu
  $(this).find('.arrow').removeClass('hide');
});

// Creo evento click sull'icona del dropdown del msg
$(document).on('mouseleave', '.chat', function() {
  // Scompare icona arrow del dropdown menu
  $(this).find('.arrow').addClass('hide');
});


// Creo evento  click su icona dropdown menu
// al click su icona dropdown menu,
$(document).on('click', '.arrow', function() {
  // $(this).parents().siblings().find('.message-options').removeClass('show');
  $('.arrow').not(this).siblings('.message-options').removeClass('show');  // con NOT
  // visualizzo/nascondo il dropdown menu
  $(this).siblings('.message-options').toggleClass('show');
});

// Creo evento mouseleave su dropdown del msg
$(document).on('mouseleave', '.message-options', function() {
  // Scompare pannello dropdown
  $(this).remove();
});


// Creo evento click su voce dropdown menu per cancellare msg
//    ---> click on voce "canc msg" (classe .message-delete)
//    ---> rimuovo msg associato a specifico dropdown con (this)
// parto da elemento cliccato, risalgo il DOM, individuo elemento con classe ".msg-wrapper" che è il contenitore del msg
$(document).on('click', '.message-delete', function() {
  $(this).closest('.msg-wrapper').remove();
});


// Creo evento click sull'icona del dropdown del msg
$(document).on('mouseleave', '.message-options', function() {
  // Scompare icona arrow del dropdown menu
  $(this).addClass('hide');
});





// -------------------- Funzione display box-emoji --------------------
$(document).on('click', '.btn-emoji', function() {
  $('.box-emoji').fadeToggle();
});


// -------------------- Funzione change typing status --------------------
$(document).on('focus', '.send-msg-bar', function() {
  $('.last-access').text('Sta scrivendo...');
});
$(document).on('keypress', '.send-msg-bar', function() {
  $('.last-access').text('Sta scrivendo...');
});

// Inserire orario corrente nel msg
var date = new Date();
var currentHours = date.getHours();
var currentMinutes = date.getMinutes();
var currentTime = addZeroToTime(currentHours) + ':' + addZeroToTime(currentMinutes);

$(document).on('blur', '.send-msg-bar', function() {
  $('.last-access').text('Ultimo accesso oggi alle ' + currentTime);
});




});  // document ready
