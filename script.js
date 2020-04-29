// global variable declarations
var firstCard;
var secondCard;
var firstCardId;
var secondCardId;
var cardsClicked;
var images;
var matches;

// call to start game
initializeGame();

// initializes the game
function initializeGame() {
    // reset global variables
    firstCard = "";
    secondCard = "";
    firstCardId = "";
    secondCardId = "";
    cardsClicked = "";
    images = [];
    matches = 0;

    // clears current images
    $("#cardHolder").empty();

    // gets 8 random cat pictures and adds their urls to the images array
    $.ajax({
        url: "https://api.thecatapi.com/v1/images/search?limit=8&size=200x200&api_key=5bbe61a3-95e5-466e-a625-9f78acf77370",
        method: "GET"
    }).then(function (response) {
        // for loop that takes each cat picture, puts it in the array twice with equal values and unique id's
        for (var i = 0; i < response.length; i++) {
            var newImg = {
                value: i,
                url: response[i].url,
                id: i
            }
            var newImg2 = {
                value: i,
                url: response[i].url,
                id: (i + response.length)
            }
            images.push(newImg, newImg2);
        }

        generateCards();

        // creates listener for the buttons on the front of the flip cards
        $("button").on("click", function () {
            // if this is the first picture flipped, save the values
            if (firstCard === "") {
                firstCard = $(this).attr("value");
                firstCardId = "#card" + $(this).attr("id");
                console.log(firstCardId);
                $(firstCardId).flip(true);
            }
            // if this is the second button flipped, save the values and check if they match
            else if (secondCard === "") {
                secondCard = $(this).attr("value");
                secondCardId = "#card" + $(this).attr("id");
                console.log(firstCardId);
                $(secondCardId).flip(true);

                // if the images dont match, wait 1.5 seconds, flip them back over, and reset variables
                if (firstCard !== secondCard) {
                    setTimeout(function () {
                        $(firstCardId).flip(false);
                        $(secondCardId).flip(false);
                        firstCard = "";
                        secondCard = "";
                        firstCardId = "";
                        secondCardId = "";
                    }, 1500);
                }
                //otherwise, reset variables, leave images flipped, and incriment matches count
                else {
                    firstCard = "";
                    secondCard = "";
                    matches++;

                    // when the matches count reaches 8, the player is alerted they won, and asked if they want to play again
                    if (matches === 8) {
                        setTimeout(function () {
                        alert("You win!");
                        var cont = confirm("Try again?");
                        if (cont === true) {
                            initializeGame();
                        }
                        }, 1500);
                    }
                }
            }

        });
    });
}

// generates each card using images from the array
function generateCards() {
    // calls the shuffle feature
    shuffleImages();

    // iterates through the images object array and creates each flip card, assigning attributes
    // and appending elements as necessary
    for (var i = 0; i < images.length; i++) {
        var newCard = $("<div>");
        newCard.addClass("card");
        newCard.attr("id", ("card" + images[i].id));

        var front = $("<div>");
        front.addClass("front");

        var back = $("<div>");
        back.addClass("back");

        var newImg = $("<img>");
        newImg.attr("src", images[i].url);

        var flipButton = $("<button>");
        flipButton.attr("type", "button");
        flipButton.addClass("cardButton");
        flipButton.attr("id", (images[i].id));
        flipButton.attr("value", images[i].value);
        flipButton.text("Flip!");

        front.append(flipButton);
        back.append(newImg);
        newCard.append(front, back);
        $("#cardHolder").append(newCard);
        $(".card").flip({
            trigger: "manual"
        });
    }
}

// doubles each img in images array and shuffles, making random pairs
function shuffleImages() {
    images.sort(function (a, b) {
        return 0.5 - Math.random();
    });
}
