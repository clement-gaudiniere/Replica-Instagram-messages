// On met à jour l'heure

// Fonction pour effacer les popups
function clearPopup() {
  $("#background-popup").css("display", "none");
  $("#popupSender").css("display", "none");
  $("#ajustements").addClass("hidden-mobil");
}

// On gère les paramètres
$("#param").click(function () {
  $("#background-popup").css("display", "block");
  $("#ajustements").removeClass("hidden-mobil");
});

$("#background-popup").click(function () {
  clearPopup();
});

// On gère la recherche d'utilisateurs
function focusUserSearch(){
  $('#confirmUser').css('display','inline');
  $('#searchedUser').css('display','inline');
}
function blurUserSearch(){
  $('#confirmUser').css('display','none');
  $('#searchedUser').css('display','none');
}
let searchQuery = true;
function majUserSearch(){
  if(searchQuery == true){
    searchQuery = false;
    setTimeout(function(){

      // On effectue la requête
      $.ajax({
        url : 'https://www.instagram.com/web/search/topsearch/',
        type : 'GET',
        data : 'context=user&count=0&query=' + $('#name').val(),
        dataType : 'json',
        success : function(rep, statut){
          console.log(rep);
        },
        error : function(rep, statut, erreur){

        },
        complete : function(rep, statut){

        }
      });
      searchQuery = true;
    }, 2000);
  }
}

// On change le bouton envoyer
function majTextarea() {
  if ($("#textarea").val().length > 0) {
    $("#gallery").css("display", "none");
    $("#submit").css("display", "inline");
  } else {
    $("#gallery").css("display", "inline");
    $("#submit").css("display", "none");
  }
}

// Gestion des messages
let messages = [
  {
    type: "receive",
    content: "Hey ! 👍🏼"
  },
  {
    type: "send",
    content: "Hi, what's up ?"
  },
  {
    type: "send",
    content: "Lorem ipsum dolor sit amet"
  },
  {
    type: "receive",
    content:
    "Duis ullamcorper egestas placerat. Nunc sed sodales mi. Nullam venenatis elit non hendrerit ullamcorper"
  },
  {
    type: "receive",
    content: "yes"
  }
];

// On affiche les messages
function displayMessages() {
  // On vide les anciens messages
  $("#messages").empty();
  for (let i = 0; i < messages.length; i++) {
    j = i - 1;
    // Si le message a été reçu
    if (messages[i]["type"] == "receive") {
      // Si le message d'avant a aussi été envoyé par l'interlocuteur
      if (i > 0 && $("#message-" + j).hasClass("message-other")) {
        // On supprime l'avatar de l'interlocuteur sur les messages précédents
        $("#message-" + j + " .logo")
          .removeClass("logo-color")
          .addClass("logo-transparent");
        // On supprime les margin
      }
      // On affiche le message
      $("#messages").append(
        '<div class="message-other" id="message-' +
        i +
        '"><div class="logo logo-color"></div><div class="message">' +
        messages[i]["content"] +
        "</div></div>"
      );
    }
    // Si le message a été envoyé par l'utilisateur
    else if (messages[i]["type"] == "send") {
      // On affiche le message
      $("#messages").append(
        '<div class="message message-my" id="message-' +
        i +
        '">' +
        messages[i]["content"] +
        "</div>"
      );
    }
  }
}
displayMessages();

// On gère l'envoi des messages
function popupSender() {
  $("#popupSender").css("display", "block");
  $("#background-popup").css("display", "block");
}

let messageType = "";
function submit(pers) {
  if ($("textarea").val().length > 0) {
    if (pers == "me") {
      messageType = "send";
    } else if (pers == "you") {
      messageType = "receive";
    }
    messages.push({
      type: messageType,
      content: $("textarea").val()
    });
    displayMessages();
    $("#textarea").val("");
    $("#messages").animate(
      { scrollTop: $("#messages").get(0).scrollHeight },
      2000
    );
    clearPopup();
  }
}
function focusTextarea() {
  $("#textarea").keypress(function(e) {
    if (e.which == 13) {
      e.preventDefault();
      popupSender();
    }
  });
}

// On supprime les messages
function deleteAllMessage() {
  messages = [];
  // On vide le contenu de la div
  $("#messages").empty();
  $("#background-popup").css("display", "none");
  $("#ajustements").addClass("hidden-mobil");
}
