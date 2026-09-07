const startButton = document.getElementById("startButton");

startButton.addEventListener("click", function () {

    document.getElementById("story").scrollIntoView({
        behavior: "smooth"
    });

});