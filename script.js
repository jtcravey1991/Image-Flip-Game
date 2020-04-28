// global variable declarations
firstCard = "a";
secondCard = "";
cardsClicked = "";
images = [];

// event listener for card clicks
$(".card").on("click", function () {
    $(".card").flip();
    alert("hi");
    if (firstCard === "") {
        firstCard = $(this).attr("value");
        alert(firstCard);
    }
});

// initializes the game
function initializeGame() {

    // gets 8 random cat pictures and adds their urls to the images array
    $.ajax({
        url: "https://api.thecatapi.com/v1/images/search?limit=8&size=200x200&api_key=5bbe61a3-95e5-466e-a625-9f78acf77370",
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.length; i++) {
            var newImg = {
                id: i,
                url: response[i].url
            }
            images.push(newImg);
        }
        doubleShuffle();
        generateCards();
    });
}

initializeGame();

function generateCards() {
    for (var i = 0; i < images.length; i++) {
        var newCard = $("<div>");
        newCard.addClass("card");
        newCard.attr("value", images[i].id);

        var front = $("<div>");
        front.addClass("front");

        var back = $("<div>");
        back.addClass("back");

        var newImg = $("<img>");
        newImg.attr("src", images[i].url);

        back.append(newImg);
        newCard.append(front, back);
        $("#cardHolder").append(newCard);
        $(".card").flip();
    }
}

// doubles each img in images array and shuffles, making random pairs
function doubleShuffle() {
    images = images.concat(images);
    images.sort(function (a, b) {
        return 0.5 - Math.random();
    });
}